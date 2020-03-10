import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  icon = {
    faGoogle: faGoogle,
    faFacebook: faFacebook,
    faGithub: faGithub
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
