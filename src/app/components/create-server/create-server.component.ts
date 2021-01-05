import { Component } from '@angular/core';

import * as _ from "lodash";

import { CloudProvider } from 'src/app/models/poseidon/cloud-provider.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ServerSize } from 'src/app/models/poseidon/server-size.model';
import { ServerImage } from 'src/app/models/poseidon/server-image.model';
import { PoseidonService } from 'src/app/services/poseidon/poseidon.service';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Region } from 'src/app/models/poseidon/region.model';

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

  public serverStart: FormGroup;
  public serverDetails: FormGroup;

  public providerControl: FormControl = new FormControl('', Validators.required);
  public regionControl: FormControl = new FormControl('', Validators.required);
  public sizeControl: FormControl = new FormControl('', Validators.required);
  public imageControl: FormControl = new FormControl('', Validators.required);

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
    this.sizeControl.valueChanges.subscribe((value) => {
      observable.next(this._filterSize(value));
    });
  });
  /// **********************

  
  constructor(private formBuilder: FormBuilder, private poseidon: PoseidonService) {
    this.cloudProviders.push(new CloudProvider("0", "Digital Ocean", "digitalocean"));
    this.cloudProviders.push(new CloudProvider("1", "OVH", "ovh"));
  }

  ngOnInit() {
    this.serverStart = this.formBuilder.group({
      providerControl: this.providerControl,
      serverName: ['', Validators.required]
    });
    this.serverDetails = this.formBuilder.group({
      regionControl: this.regionControl,
      sizeControl: this.sizeControl,
      imageControl: this.imageControl
    });

    this.providerControl.valueChanges.subscribe(() => {
      var provider = this.cloudProviders.filter(p => p.id == this.providerControl.value)[0];

      if(provider !== undefined) {
        this.poseidon.getRegions(provider).subscribe(regions => {
          this.regions = regions;
          this.regionControl.setValue('');
        });

        this.poseidon.getSizes(provider).subscribe(sizes => {
          this.serverSizes = sizes;
          this.sizeControl.setValue('');
        });
  
        this.poseidon.getImages(provider).subscribe(images => {
          this.serverImages = images;
          this.imageControl.setValue('');
        });
      }
    });
  }

  private _getRegion(regions: Region[], name: string): Region {
    var regions = regions.filter(region => region.name == name || region.slug == name);
    return regions.length == 1 ? regions[0] : new Region('', '');
  }

  private _filterRegion(value: string): Region[] {
    const filterValue = value.toLowerCase();
    return _.uniqBy(this.regions.filter(region => region.name.toLowerCase().includes(filterValue)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }

  private _filterSize(value: string): ServerSize[] {
    const filterValue = value.toLowerCase();
    const region = this._getRegion(this.regions, this.regionControl.value);
    return _.uniqBy(this.serverSizes.filter(size => size.name.toLowerCase().includes(filterValue) && ((region.slug && size.regions.includes(region.slug)) || !region.slug)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }

  private _filterImage(value: string): ServerImage[] {
    const filterValue = value.toLowerCase();
    return _.uniqBy(this.serverImages.filter(image => image.name.toLowerCase().includes(filterValue)).sort((a, b) => a.name.localeCompare(b.name)), 'name');
  }
}
