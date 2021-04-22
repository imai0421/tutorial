import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Add', () => {
    var cnt = service.messages.length;
    service.add('A');
    expect(service.messages.length).toEqual(cnt + 1);
  });

  it('Clear', () => {
    service.messages.push('A');
    service.messages.push('B');
    var cnt = service.messages.length;
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
});
