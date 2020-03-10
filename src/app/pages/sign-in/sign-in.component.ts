import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  icon = {
    faGoogle: faGoogle,
    faFacebook: faFacebook,
    faGithub: faGithub
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
