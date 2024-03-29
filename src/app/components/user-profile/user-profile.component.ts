import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  email: any;
  isLoading = true;

  user: any;
  counties?: string[];
  userForm: FormGroup = new FormGroup({}, { updateOn: 'change' });
  constructor( public _http: HttpClient, public authenticator: AuthenticatorService, public _httpUser:EventService, private fb: FormBuilder) { 
    this.counties = this._httpUser.counties;
    

  }

  ngOnInit(): void {
    this.loadData().then(() => {
      // When data is loaded, hide the progress bar
      this.isLoading = false;
    });

    console.log(this.authenticator?.user?.attributes)
    this.email = this.authenticator?.user?.attributes?.email;
    this.getUser(); 
    this.userForm = new FormGroup({
      username: new FormControl(this.authenticator?.user?.attributes?.['name'], [Validators.required]),
      surname: new FormControl(this.authenticator?.user?.attributes?.['family_name'], [Validators.required]),
      email: new FormControl(),
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      county: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    });


    this.getUser().then(() => {
      console.log(this.user)
      // Set the values of the form controls based on the user object
      this.userForm.patchValue({
          username: this.user.name,
          surname: this.user.family_name,
          email: this.user.email,
          gender: this.user.gender,
          dob: this.user.dob,
          county: this.user.county,
          zip: this.user.zip
      });
  });

}

private async loadData(): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}


updateUser() {
  const formData = this.userForm.value; // Get the form data
  const updateFields = {
    username: formData.username,
    county: formData.county,
    dob: formData.dob,
    gender: formData.gender,
    surname: formData.surname,
    zip: formData.zip
  };
  const payload = {
    email:  this.email ,
    updateFields: updateFields
  };

  return this._http.put('https://41z1wg9xa4.execute-api.eu-west-1.amazonaws.com/dev/put-user', payload);
}



  async getUserDate() {
    try {
      const response = await this._httpUser.getUser(this.email).toPromise();
      this.user = response;
      console.log('user', response);
    } catch (error) {
      console.error(error);
      // Handle error message here
    }

    return false;
  }
async getUser(){
  try {
  const user =  await this._httpUser.getUser(this.email).toPromise()
  this.user = user;
  localStorage.setItem('user', JSON.stringify(this.user)); 


  } catch (error) {
      console.error(error);
    }
  }
  
  onSubmit() {
    console.log(this.userForm);
    this.updateUser().subscribe(data => {
      console.log('my data', data);
      // Show success message to user, or update the user object in the component
      // based on the response data from the API
    }, error => {
      console.error(error);
      // Show error message to user
    });


  }
  

}
