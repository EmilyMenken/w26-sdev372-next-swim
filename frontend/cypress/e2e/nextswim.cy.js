describe("NextSwim E2E Flows", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/resources");
  });

  it("Flow 1: Add a new resource and see it in the list", () => {
    // Fill out the AddResource form
    cy.get("input[placeholder='Resource Title']").type("Test Video Resource");
    cy.get("input[type='number']").clear().type("2");
    cy.get("textarea").type("This is a test resource description.");
    cy.get("input[placeholder='URL (https://...)']").type("https://example.com");

    // Submit
    cy.contains("Add to NextSwim").click();

    // Check alert
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Resource added successfully");
    });
  });

  it("Flow 2: Complete Swim Level Analysis quiz and see recommended resources", () => {
    cy.contains("Quiz").click();
    cy.contains("Swim Level Analysis").click();

    // Step 0
    cy.contains("Which best describes your swimming ability?").parent().contains("Intermediate").click();

    // Step 1
    cy.contains("How confident do you feel in the water?").parent().contains("4").click();

    // Step 2
    cy.contains("How confident are you in deep water (>7 ft)?").parent().contains("High").click();

    // Step 3
    cy.contains("How comfortable are you putting your face in the water?").parent().contains("Comfortable").click();

    // Step 4
    cy.contains("Can you float on your front and back?").parent().contains("Both").click();

    // Step 5
    cy.contains("How far can you swim (yards)?").parent().contains("50+").click();

    // Step 6
    cy.contains("How confident are you with rhythmic/rotary breathing?").parent().contains("4").click();

    // Step 7
    cy.contains("Do you know streamline position?").parent().contains("Yes").click();

    // Step 8
    cy.contains("Do you know freestyle (front crawl)?").parent().contains("Yes").click();

    // Step 9
    cy.contains("Do you know backstroke?").parent().contains("Yes").click();

    // Step 10
    cy.contains("Do you know elementary backstroke?").parent().contains("Yes").click();

    // Step 11
    cy.contains("Do you know sidestroke?").parent().contains("Yes").click();

    // Step 12
    cy.contains("Do you know breaststroke?").parent().contains("Yes").click();

    // Step 13
    cy.contains("Do you know dolphin kick?").parent().contains("Yes").click();

    // Step 14
    cy.contains("Can you do a surface dive?").parent().contains("Yes").click();

    // Step 15
    cy.contains("Can you do kneeling, standing, or starting dives?").parent().contains("Yes").click();

    // Step 16
    cy.contains("Do you know butterfly?").parent().contains("Yes").click();

    // Step 17
    cy.contains("How long can you tread water?").parent().contains("2+ min").click();

    // Step 18
    cy.contains("Can you do an open turn?").parent().contains("Yes").click();

    // Step 19
    cy.contains("Do you know standard sculling (front/back)?").parent().contains("Yes").click();

    // Step 20
    cy.contains("Can you do a flip turn?").parent().contains("Yes").click();

    // Check that at least one recommended resource is visible
    cy.get("ul li").should("have.length.greaterThan", 0);
  });

  it("Flow 3: Complete Water Safety Quiz and see recommended resources", () => {
    cy.contains("Quiz").click();
    cy.contains("Water Safety Quiz").click();

    const waterSafetyAnswers = [
      "Keep people safe",
      "They respond to emergencies",
      "No",
      "Reach or throw",
      "Stay afloat",
      "Call 911",
      "Can save lives",
      "Constantly",
      "Sunscreen",
      "Rest and float"
    ];

    waterSafetyAnswers.forEach(answer => {
      cy.contains(answer).click();
    });

    // Ensure at least one recommended resource is visible
    cy.get("ul li").should("have.length.greaterThan", 0);
  });

});