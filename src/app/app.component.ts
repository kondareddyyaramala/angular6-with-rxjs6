import { Component } from '@angular/core';
import { of, Observable, from, concat } from 'rxjs';
import { filter, catchError, tap, concatAll } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public formattedArray = [];
  public capitalizedInput;

  ngOnInit() {
    this.fromAndFilterExample();
  }

  // Creating an array from the static array and filtering to get out even numbers 
  // and then subscribing to it and concatenating to the array
  fromAndFilterExample() {
    const obs = from(this.array).pipe(
      filter(v => v % 2 === 0),
    )
    obs.subscribe(v => this.formattedArray.push(v));
  }


  // Javscript method chaining fromAndFilterExample
  capitalize(sentence = '') {
    // capitalize the first word in each word in the five sentence
    this.capitalizedInput = sentence
      .split('')
      .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('');
  }

}
