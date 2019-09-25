Feature: search
  As a user
  I want to find the desired literature
  So, I would be able to read them

  Background:
    Given the user has browsed to the homepage

  Scenario: user should be able to search in english characters using translated text
    When the user enters the string "munaa madan" into the main search field
    And the user selects the transliterated text
    And the user searches for the literature
    Then the search result should be displayed

  Scenario: no search result should be displayed when the user search for invalid literature
    When the user enters the string "fddfvdf vsfg dvdvdffdg" into the main search field
    And the user selects the transliterated text
    And the user searches for the literature
    Then the search result should not be displayed

  Scenario: user should be able to search in nepali characters
    When the user enters the string "मुना मदन्" into the main search field
    And the user searches for the literature
    Then the search result should be displayed

  Scenario: no search result should be displayed when the user search for invalid literature
    When the user enters the string "fस्द्fस्द्fस्द्fस्द्f" into the main search field
    And the user searches for the literature
    Then the search result should not be displayed