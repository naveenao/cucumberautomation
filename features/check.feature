@checkfeature
Feature: Check

@scenario1
 Scenario: To run aat on cucumber website
  When the user launch website "https://cucumber.io/"
  And the user does the cucumber flow
  And the user navigates to next tab by index 1
  Then the user continues flow in swagger
  And the user navigates to next tab by index 1
  Then the user opens gitlab
  And the user navigates to previous tab
  Then the user clicks editor
  And the user navigates to next tab by index 2
  Then the user starts the soap ui flow and search "node"

@scenario2
 Scenario: To run aat on amazon
  When the user launch website "https://www.amazon.in/"
  And the user clicks on "todaysDeals"
  And the user close the browser