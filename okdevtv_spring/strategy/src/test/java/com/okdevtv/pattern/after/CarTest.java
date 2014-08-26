package com.okdevtv.pattern.after;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class CarTest {

  @Test
  public void 급정거() {
    FakeSpeaker speaker = new FakeSpeaker();
    Car car = new Car(speaker);
    car.급정거(1);
    assertEquals("1", speaker.getString());
  }
  
  @Test
  public void 실정거() {
    CarSpeaker speaker = new CarSpeaker();
    Car car = new Car(speaker);
    car.급정거(1);
  }

}
