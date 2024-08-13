import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitingRoomPage } from './waiting-room.page';

describe('WaitingRoomPage', () => {
  let component: WaitingRoomPage;
  let fixture: ComponentFixture<WaitingRoomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
