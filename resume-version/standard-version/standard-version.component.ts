import { Component, OnInit, EventEmitter, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslatePipe } from '../../shared/translate/translate.pipe';
import { TranslateService } from '../../shared/translate/translate.service';
import { TranslateComponent } from '../../shared/translate/translate.component';
import { ResumeVersionService } from '../../core/resume-version.service';
import { PersonalInfo } from '../../shared/models/personal-info';
import { Section } from '../../shared/models/section';
import { ResumeVersion } from '../../shared/models/resume-version';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { EducationComponent } from '../section/education/education.component';
import { ExperienceComponent } from '../section/experience/experience.component';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-standard-version',
  templateUrl: './standard-version.component.html',
  styleUrls: ['./standard-version.component.css']
})
export class StandardVersionComponent implements OnInit, AfterViewInit {
    @ViewChild(PersonalInfoComponent )
    personalInfoComponent: PersonalInfoComponent;
    sectionList: Section[] = [];    
    version: ResumeVersion = new ResumeVersion();
    stepNo: number = 2;
    constructor(
        private router : Router,
        private _versionService: ResumeVersionService, 
        private _translateSevice: TranslateService       
    ){  }
    ngAfterViewInit(){
        //this.personalInfoComponent.personalInfo = this.version.personalInfo;
    }
    ngOnInit(){          
      this.addSection({"$key": "",  "title": "Education", "icon": "ion-university", "type": "education", "itemList":[]});
      this.addSection({"$key": "",  "title": "Experience", "icon": "ion-briefcase", "type": "experience", "itemList": []});                  
    }  
    next(value?: any){
      switch(this.stepNo){
        case 1:{
          this.version.templateID = value;
          this.stepNo++;
          break;
        }
        case 2:{
          if(this.personalInfoComponent.checkValidation()){
            this.stepNo++;          
          }             
          break;
        }
        case 3:{
          this.stepNo++;
          break;
        }
        case 4:{
          this.stepNo++;
          break;
        }
      }   
    }  
    previous(){
      this.stepNo--;
    }
    preview(){
      this._versionService.currentVersion = this.version;
      this.router.navigate(['resume-template']);
    }
    addSection(s:Section){
        let section = new Section(s.title, s.icon, s.type, []);
        this.version.sectionList.push(section);
	  }
    saveVersion(){
        this._versionService.addVersion(this.version);             
    }
    

}