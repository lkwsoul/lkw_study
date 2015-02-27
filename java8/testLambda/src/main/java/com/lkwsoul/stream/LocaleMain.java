package com.lkwsoul.stream;

import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class LocaleMain {
  
  public Stream<Locale> makeLocale() {
    Stream<Locale> locales = null;
    locales = Stream.of(Locale.getAvailableLocales());
    return locales;
  }
  
  public Map<String,String> getLangeNames(Stream<Locale> locales){
    Map<String,String> langenames = locales.collect(
        Collectors.toMap(
            l -> l.getDisplayLanguage(),
            l -> l.getDisplayLanguage(l),
            (existingValue, newValue) -> existingValue
            )
        );
    return langenames;
  }
  
  public Map<String, Set<String>> getCountryLanguageSet(Stream<Locale> locales) {
    /*Map<String,Set<String>> countryLanguageSet = locales.collect(
        Collectors.toMap(
            l -> l.getDisplayCountry(),
            l -> Collectors.singleton(l.getDisplayLanguage()),
              (a, b) -> { // a와 b의 합집합
                Set<String> r = new HashSet<>(a);
                r.addAll(b);
                return r;
              }
            )
        );
    
    return countryLanguageSets;*/
	  return null;
  }
  public Map<String, List<Locale>> countryToLocales() {
	  return null;
  }

}
