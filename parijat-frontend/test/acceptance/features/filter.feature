Feature: Filter Search Results

  As a user
  I want to be able to filter the search results
  So that I can better find the desired literature

  Background:
    Given the user has browsed to the homepage
    And the user has entered the string "munaa madan" into the main search field
    And the user has selected the transliterated text
    And the user has searched for the literature

  Scenario Outline: User should be able to filter the search results based on the preferred author
    When the user filters the results based on author "<author_name>"
    Then the result should only show the literature written by "<author_name>"
    Examples:
      | author_name |
      | दिलिप योन्जन   |
      | पुरुषोत्तम सुवेदी  |
      | विप्लव ढकाल    |
