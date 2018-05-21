import { Component, Input } from '@angular/core';

@Component ({
  selector: 'ordering-menu',
  template: ` <hr>
   <div class="row-fluid">
    <div class="col-xs-1"></div>
    <div id="leftBox" class="col-xs-5">

      <pizza-menu></pizza-menu>
    </div>
    <div id="rightBox" class="col-xs-5">
    <div>
      <h3>Your order summary:</h3>
      <hr>
    </div>
      <div class="well text-center">
        <current-order></current-order>
      </div>
      <div class="well text-center">
        <order-summary></order-summary>
      </div>
    </div>
    <div class="col-xs-1"></div>
  </div>`
})

export class OrderingComponent {

}
