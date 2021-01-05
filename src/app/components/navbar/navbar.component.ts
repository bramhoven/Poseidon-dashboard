import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateServerDialogComponent } from '../create-server-dialog/create-server-dialog.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})  
export class NavbarComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(CreateServerDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
