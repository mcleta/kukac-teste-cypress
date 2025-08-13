describe("Kanban Board - Fluxos principais", () => {
  beforeEach(() => {
    cy.visit("https://kanban-dusky-five.vercel.app/");
  });

  it("Deve criar uma nova tarefa na lista Done", () => {
    cy.get("#🚀\\ \\ DoneCreateTask").click();
    cy.get("#🚀\\ \\ DoneCreateTask input").type("Nova tarefa Cypress{enter}");

    cy.contains(".content p", "Nova tarefa Cypress").should("be.visible");
  });

  it("Deve editar uma tarefa existente", () => {
    cy.contains(".content p", "Wireframe das telas").click();
    cy.contains(".custom-input > p", "Wireframe das telas")
      .click()
      .get('input[type="text"]')
      .type("Tarefa editada Cypress");
    cy.contains("button", "Editar Nome da task").click();

    cy.contains(".content p", "Tarefa editada Cypress").should("be.visible");
    cy.contains(".custom-input > p", "Tarefa editada Cypress").should(
      "be.visible"
    );
  });

  it("Excluir tarefa deve remover imediatamente (bug conhecido)", () => {
    cy.contains("p", "Wireframe das telas")
      .closest(".content")
      .find(".trash")
      .click({ force: true });

    cy.contains(".content p", "Wireframe das telas").should("not.exist");
  });

  it("Deve criar uma nova lista", () => {
    cy.get(".sc-jqUVSM").click();
    cy.get(".sc-jqUVSM input").type("Lista Cypress{enter}");
    cy.contains(".board-header-title", "Lista Cypress").should("be.visible");
  });

  it("Modal de tarefa deve exibir tags (bug conhecido)", () => {
    cy.contains(".content p", "UX Review").click();
    cy.get(".tag").should("exist");
  });

  it.only("Deve adicionar tag a uma tarefa existente", () => {
    cy.contains(".content p", "Wireframe das telas").click();
    cy.contains(".custom-input > p", "Adicionar nova Tag")
      .click()
      .get('input[type="text"]')
      .type("Nova Tag");
    cy.contains("button", "Enviar").click();
    cy.get("div.sc-hKMtZM.fSuuAT").click("topLeft");
    cy.contains("label", "Nova Tag").should("be.visible");
  });

  it("Deve permitir rolagem horizontal do board", () => {
    cy.get("body").trigger("wheel", { deltaX: 300 });
    cy.contains("Adicionar outra lista").should("be.visible");
  });
});
