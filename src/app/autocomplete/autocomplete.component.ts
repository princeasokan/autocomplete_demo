import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  search: string;
  comments: any[];
  dataFetch: boolean;
  nameAndEmails: any[]  
  suggetions: any[];
  searchWordLen: number;
  previousLen: number;
  searchLen=4;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.comments = [];
    this.dataFetch = false;
    this.nameAndEmails = []
    this.suggetions = []
  }

  //initially initNameAndEmails list added with complete name and emails,keeping two seperate list
  initNameAndEmails(list): void {
    this.nameAndEmails = [];
    list.forEach(item => {
      this.nameAndEmails.push(item.name);
      this.nameAndEmails.push(item.email);
    })

  }

  //format the suggetion list & returns
  getSuggetions() {
    const search = this.search.toLocaleLowerCase();
    //initially suggetion list added with complete name and emails
    if (!this.suggetions.length) {
      const tmpList = [...this.nameAndEmails];
      this.suggetions = tmpList.filter(item => (item.toLocaleLowerCase().indexOf(search) === 0))
    }
    //once user start typing and complete 4 letter, suggetion list filter with search word
    else if (search.length > 3) {
      this.suggetions = this.suggetions.filter(item => (item.toLocaleLowerCase().indexOf(search)) === 0)
    }
  }

  //leading previous suggention list/ called this fun every backspace or delete key pressed
  loadPreviousSuggetion(): void {
    const search = this.search.toLocaleLowerCase();
    this.suggetions = this.nameAndEmails.filter(item => (item.toLocaleLowerCase().indexOf(search) === 0))
  }

  //called each keyup event
  getList(key: any) {
    this.searchWordLen = this.search ? this.search.length : 0;
    //delete & backspace handling
    if (key.keyCode == 46 || key.keyCode == 8) {
      this.previousLen = this.search.length ? this.search.length + 1 : 1;
      if (this.searchWordLen >= this.searchLen) {
        this.loadPreviousSuggetion();
      }
      else {
        this.suggetions = []
      }
    }
    else {
      //initial data fetch from url,this happens only initial time only
      if (!this.dataFetch) {
        this.fetchDataFromUrl().subscribe(data => {
          this.comments = data;
          this.dataFetch = true;
          this.nameAndEmails = []
          this.initNameAndEmails(this.comments)
        })
      }
      // after completing letters , suggetions will start loading
      else if (this.searchWordLen >= this.searchLen) {
        console.log('load suggetions')
        this.getSuggetions();
      }
    }
  }
  clearSearch(e: any) {
    //clear the suggention list
    this.suggetions = [];
  }
  selectSuggetion(data: any) {
    this.search = data;
    this.suggetions = []
  }
  removeSuggetion(data: any) {
    this.suggetions = this.suggetions.filter(item => (data != item));
    this.nameAndEmails = this.nameAndEmails.filter(item => (item.indexOf(data) != 0));
  }
  fetchDataFromUrl(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
  }

}
