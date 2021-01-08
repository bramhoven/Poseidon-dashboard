import { Component } from '@angular/core';

import * as _ from "lodash";

import { CloudProvider } from 'src/app/models/poseidon/cloud-provider.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ServerSize } from 'src/app/models/poseidon/server-size.model';
import { ServerImage } from 'src/app/models/poseidon/server-image.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import { Observable } from 'rxjs';
import { Region } from 'src/app/models/poseidon/region.model';
import { PublicSshKey } from 'src/app/models/poseidon/public-ssh-key.model';
import { CreateServerRequest } from 'src/app/models/poseidon/requests/create-server-request.model';
import { Router } from '@angular/router';
import { ErrorModel } from 'src/app/models/poseidon/error.model';

@Component({
  selector: 'create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss']
})
export class CreateServerComponent {
  public cloudProviders: CloudProvider[] = [];
  public regions: Region[] = [];
  public serverSizes: ServerSize[] = [];
  public serverImages: ServerImage[] = [];
  public sshKeys: PublicSshKey[] = [];

  public serverStart: FormGroup;
  public serverDetails: FormGroup;
  public serverSecurity: FormGroup;

  public providerControl: FormControl = new FormControl('', Validators.required);
  public serverNameControl: FormControl = new FormControl('', Validators.required);
  public regionControl: FormControl = new FormControl('', Validators.required);
  public sizeControl: FormControl = new FormControl('', Validators.required);
  public imageControl: FormControl = new FormControl('', Validators.required);
  public sshKeyControl: FormControl = new FormControl('', Validators.required);

  private providerName: CloudProvider;

  /// **********************
  ///     Filter options
  /// **********************
  public filteredOptionsRegion: Observable<Region[]> = new Observable<Region[]>(observable => {
    this.regionControl.valueChanges.subscribe((value) => {
      observable.next(this._filterRegion(value));
      this.sizeControl.setValue(this.sizeControl.value);
      this.imageControl.setValue(this.imageControl.value);
    });
  });
  
  public filteredOptionsSize: Observable<ServerSize[]> = new Observable<ServerSize[]>(observable => {
    this.sizeControl.valueChanges.subscribe((value) => {
      observable.next(this._filterSize(value));
    });
  });

  public filteredOptionsImage: Observable<ServerImage[]> = new Observable<ServerImage[]>(observable => {
    this.imageControl.valueChanges.subscribe((value) => {
      observable.next(this._filterImage(value));
    });
  });

  public filteredOptionsSshKey: Observable<PublicSshKey[]> = new Observable<PublicSshKey[]>(observable => {
    this.sshKeyControl.valueChanges.subscribe((value) => {
      observable.next(this._filterSshKey(value));
    });
  });
  /// **********************

  public error: ErrorModel;

  public showStepper: boolean = true;
  public showLoading: boolean = false;
  public showError: any = () => this.error != undefined;
  
  constructor(private formBuilder: FormBuilder, private poseidon: PoseidonService, private router: Router) {
    this.cloudProviders.push(new CloudProvider("0", "Digital Ocean", "digitalocean"));
    this.cloudProviders.push(new CloudProvider("1", "OVH", "ovh"));
  }

  ngOnInit() {
    this.serverStart = this.formBuilder.group({
      providerControl: this.providerControl,
      serverNameControl: this.serverNameControl
    });
    this.serverDetails = this.formBuilder.group({
      regionControl: this.regionControl,
      sizeControl: this.sizeControl,
      imageControl: this.imageControl
    });
    this.serverSecurity = this.formBuilder.group({
      sshKeyControl: this.sshKeyControl
    });

    this.providerControl.valueChanges.subscribe(() => {
      this.providerName = this.cloudProviders.filter(p => p.id == this.providerControl.value)[0];

      if(this.providerName !== undefined) {
        this.poseidon.getRegions(this.providerName).subscribe(regions => {
          this.regions = regions;
          this.regionControl.setValue('');
        });

        this.poseidon.getSizes(this.providerName).subscribe(sizes => {
          this.serverSizes = sizes;
          this.sizeControl.setValue('');
        });
  
        this.poseidon.getImages(this.providerName).subscribe(images => {
          let checkedImages: ServerImage[] = [];

          images.forEach(image => {
            if(image.name.length == 0 && image.description.length > 0)
              image.name == image.description;

            if(image.description.length == 0 && image.name.length > 0)
              image.description == image.name;

            if(image.name.length > 0 && image.description.length > 0)
              checkedImages.push(image);
          });

          this.serverImages = checkedImages;
          this.imageControl.setValue('');
        });

        this.poseidon.getSshKeys(this.providerName).subscribe(sshKeys => {
          this.sshKeys = sshKeys;
          this.sshKeyControl.setValue('');
        });
      }
    });
  }

  public createServer() {
    this.showStepper = false;
    this.showLoading = true;

    const serverRequest = new CreateServerRequest();
    serverRequest.name = this.serverNameControl.value;
    serverRequest.image = this._getImage( this.imageControl.value).id;
    serverRequest.region = this._getRegion(this.regionControl.value).slug;
    serverRequest.size = this._getSize(this.sizeControl.value).name;
    serverRequest.sshKeyId = this._getSshKey(this.sshKeyControl.value).id;

    console.log(serverRequest);

    this.poseidon.createServer(this.providerName, serverRequest).subscribe(server => {
      this.router.navigate([`/servers/${server.id}`]);
    }, httpError => {
      this.error = httpError.error as ErrorModel;
      this.showStepper = true;
      this.showLoading = false;
    });
  }

  /// **********************
  ///      Get objects
  /// **********************
  private _getRegion(name: string): Region {
    const regions = this.regions.filter(region => region.name == name || region.slug == name);
    return regions.length == 1 ? regions[0] : new Region();
  }

  private _getSize(name: string): ServerSize {
    const sizes = this.serverSizes.filter(size => size.name == name);
    return sizes.length == 1 ? sizes[0] : new ServerSize();
  }

  private _getImage(description: string): ServerImage {
    const images = this.serverImages.filter(image => image.description == description);
    return images.length == 1 ? images[0] : new ServerImage();
  }

  private _getSshKey(name: string): PublicSshKey {
    const sshKeys = this.sshKeys.filter(sshKey => sshKey.name == name);
    return sshKeys.length == 1 ? sshKeys[0] : new PublicSshKey();
  }
  /// **********************

  /// **********************
  ///    Filter functions
  /// **********************
  private _filterRegion(value: string): Region[] {
    const filterValue = value.toLowerCase();
    return _.uniqBy(this.regions.filter(region => region.name.toLowerCase().includes(filterValue)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }

  private _filterSize(value: string): ServerSize[] {
    const filterValue = value.toLowerCase();
    const region = this._getRegion(this.regionControl.value);
    return _.uniqBy(this.serverSizes.filter(size => size.name.toLowerCase().includes(filterValue) && ((region.slug && size.regions.includes(region.slug)) || !region.slug)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }

  private _filterImage(value: string): ServerImage[] {
    const filterValue = value.toLowerCase();
    return _.uniqBy(this.serverImages.filter(image => image.description.toLowerCase().includes(filterValue)).sort((a, b) => a.description.localeCompare(b.description)), 'description');
  }

  private _filterSshKey(value: string): PublicSshKey[] {
    const filterValue = value.toLowerCase();
    return _.uniqBy(this.sshKeys.filter(sshKey => sshKey.name.toLowerCase().includes(filterValue)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }
  /// **********************
}
