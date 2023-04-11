import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Import the AuthService type from the SDK
// import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngxs/store';
import { AddAuth } from 'app/store/auth.actions';
import { AuthService as AuthAPIService } from '../../services/auth.service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.scss'],
})
export class BeginComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private router: Router,
  ) {}
  ngOnInit(): void {

  }

}