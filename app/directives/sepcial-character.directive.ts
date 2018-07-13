import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[sars-sepcialcharacter]',
  host: {
    '(keypress)': 'stopSepcialCharacter($event)',
    '(keyup)': 'stopSepcialCharacter($event)',
    '(mouseleave)': 'stopSepcialCharacter($event)'

  }
})
export class SepcialCharacterDirective {

  @Input('sars-sepcialcharacter') value: string;
  constructor(private el: ElementRef, private renderer: Renderer, public model:NgModel) {
    // renderer.setElementStyle(el.nativeElement, 'display', 'none');
  }


  stopSepcialCharacter(event) {
    var that = this;
    let reg = /^[^ĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĖėĘęĚĜĜĞğĠġĢģĤĥĦħħĨĩĪīĬĭĮįİİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńņŇňŉŊŋōŎŏŐőŒŔŕŖŗŘŚśŜŝŞşŠŢţŤťŦŧŨŪūŬŭŮůŰŲųŴŵŶŷŹźŻżŽſƀƁƂƃƄƅƇƈƉƊƋƌƎƏƐƑƒƓƕƖƗƘƙƚƛƝƞƟƠơƢƤƥƦƧƨƩƪƬƭƮƯưƲƳƴƵƶƷƸƹƺƼƽƾƿǀǁǃǄǅǆǇǉǊǋǌǍǎǏǑǒǓǔǕǖǗǘǙǛǜǝǞǟǠǡǢǤǥǦǧǨǩǪǫǬǭǮǰǱǲǳǴǵǶǷǸǺǺǼǽǾǿȀȁȂȃȄȅȆȈȉȊȋȌȍȎȏȐȒȓȔȕȖȗȘȚțȜȝȞȟȠȢȣȤȥȦȧȨȩȪȫȬȮȯȰȱȲɐɑɒɓɔɖɗɘəɚɜɝɞɠɡɣɤɥɦɨɩɪɫɬɮɯɰɲ¦·]*$/;

    let regtest = new RegExp(reg)
    if (!regtest.test(event.target.value)) {
      event.target.value = null;
      // event.event.preventDefault();
      that.model.reset();
      if(event.target.attributes.required){
        event.target.className = "form-control ng-pristine ng-invalid ng-touched";
      }
    }
  }

}
