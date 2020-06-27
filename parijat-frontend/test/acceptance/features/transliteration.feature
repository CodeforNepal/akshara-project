Feature: transliteration
  As a user
  I want to be able to transliterate latin characters into nepali characters
  So, I can search using latin characters

  Background:
    Given the user has browsed to the homepage

  Scenario: nepali string transliteration for the entered english character term should be displayed
    When the user enters the string "nepaala" into the main search field
    Then the transliteration should be "नेपाल"

  Scenario: nepali string transliteration for the entered nepali character term should not be displayed
    When the user enters the string "नेपाल" into the main search field
    Then the transliteration should not be displayed
