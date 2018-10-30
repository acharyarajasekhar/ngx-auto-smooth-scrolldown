# Angular 2+ Auto Smooth Scroll Down Directive - Library

## Installation

npm install ngx-auto-smooth-scrolldown

## Usage

#### In module:

```typescript
import { NgxAutoSmoothScrollDownModule } from 'ngx-auto-smooth-scrolldown';

@NgModule({
  ...
  imports: [
    ...
	NgxAutoSmoothScrollDownModule,
	...
  ],
  ...
})
export class AppModule { }
```

#### In template:

```html
<div class="messages" ngx-auto-smooth-scrolldown lock-y-offset="100">
	<div *ngFor="let item of items">...</div>
</div>
```