import { Component, NgZone, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { delay } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
 
  title = 'angular9';
  ngOnInit(): void {
    const source = interval(1000);
    source
      .pipe(delay(500))
      .subscribe(_=> {
        console.log('NgZone.isInAngularZone() async', NgZone.isInAngularZone());
        console.log(` async`, window[`Zone`].current);
        // 如果zone.js是在index.js中用import 'zone.js';导入
        // 此时NgZone.isInAngularZone()是false,视图不会即时更新
        //
        // 在主应用index.html中用全局<script src="/assets/js/zone.js"></script>方式引用
        // NgZone.isInAngularZone()是true，视图显示正常更新
        this.title = 'angular9-' + new Date().toTimeString();
      });
  }
}
