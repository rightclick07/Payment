import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('ccNumber') ccNumberField: ElementRef;
  cardImagePath = "../../assets/image/card.jpeg";
  chipImagePath = "../../assets/image/chip.png"
  masterCardImagePath = "../../assets/image/mastercard.png";
  visaCardImagePath = "../../assets/image/visa.png";
  unionPayImagePath = "../../assets/image/unionpay.png";
  americanExpressImagePath = "../../assets/image/amex.png";
  dinnersClubImagePath = "../../assets/image/dinnersclub.png";
  discoverImagePath = "../../assets/image/discover.png";
  jcbImagePath = "../../assets/image/jcb.png";
  troyImagePath = "../../assets/image/troy.png";
  americanExpressFlag=false;
  visaCardFlag = false;
  masterCardFlag = false;
  unionPayFlag = false;
  cardFlag=true;
  account = "XXXX - XXXX - XXXX - XXXX"
  months = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  years = [
    2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
  ]
  paymentForm:FormGroup;
  
  constructor() {
    
  }
  ngOnInit(): void { 
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('',[Validators.required,Validators.pattern('^[ 0-9]*$')]),
      cardHolderName: new FormControl('',[Validators.required]),
      cvv: new FormControl('',[Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.paymentForm.controls[controlName].hasError(errorName);
  }
  
  creditCardNumberSpacing() {
    const input = this.ccNumberField.nativeElement;
    const { selectionStart } = input;
    const { cardNumber } = this.paymentForm.controls;

    let trimmedCardNum = cardNumber.value.replace(/\s+/g, '');

    if (trimmedCardNum.length > 16) {
      trimmedCardNum = trimmedCardNum.substr(0, 16);
    }

     /* Handle  spacing */
    const partitions = trimmedCardNum.startsWith('34') || trimmedCardNum.startsWith('37') 
                       ? [4,6,5] 
                       : [4,4,4,4];

    const numbers = [];
    let position = 0;
    partitions.forEach(partition => {
      const part = trimmedCardNum.substr(position, partition);
      if (part) numbers.push(part);
      position += partition;
    })

    cardNumber.setValue(numbers.join(' '));

    /* Handle caret position if user edits the number later */
    if (selectionStart < cardNumber.value.length - 1) {
      input.setSelectionRange(selectionStart, selectionStart, 'none');
    }
     if(cardNumber.value.startsWith('34') || cardNumber.value.startsWith('37')){
      this.americanExpressFlag = true;
      this.masterCardFlag=false;
      this.visaCardFlag= false;
      this.unionPayFlag = false;
      this.cardFlag = false;
     } else if(cardNumber.value.startsWith('4')){
      this.visaCardFlag = true;
      this.americanExpressFlag = false;
      this.masterCardFlag=false;
      this.unionPayFlag = false;
      this.cardFlag = false;
     }else if(cardNumber.value.startsWith('51')){
      this.masterCardFlag = true;
      this.visaCardFlag = false;
      this.americanExpressFlag = false;
      this.unionPayFlag = false;
      this.cardFlag = false;
     }else if(cardNumber.value.startsWith('62')){
      this.unionPayFlag = true;
      this.visaCardFlag = false;
      this.americanExpressFlag = false;
      this.masterCardFlag=false;
      this.cardFlag = false;
     }
  }
  
}
