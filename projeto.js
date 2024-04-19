const drivers = [
  {
    name: "Paulo",
    email: "paulo.outlook.com",
    password: 8546,
    cpf: "123456789102",
    weight: 500,
    avaliation: "4.4 estrelas",
    price: "3.000",
    vehiclePlate: "ABC-9897",
  },
  {
    name: "José",
    email: "jose.outlook.com",
    password: 8521,
    cpf: "123456963102",
    weight: 680,
    avaliation: "4.9 estrelas",
    price: "5.000",
    vehiclePlate: "ABC-1297",
  },
  {
    name: "Ademir",
    email: "ademir.outlook.com",
    password: 8946,
    cpf: "963456789102",
    weight: 200,
    avaliation: "4.1 estrelas",
    price: "500",
    vehiclePlate: "HYA-9897",
  },
  {
    name: "Emanuel",
    email: "emanuel.outlook.com",
    password: 9821,
    cpf: "547456789102",
    weight: 930,
    avaliation: "3.8 estrelas",
    price: "4.250",
    vehiclePlate: "PLA-9897",
  },
  {
    name: "Lourival",
    email: "lourival.outlook.com",
    password: 8854,
    cpf: "427456789102",
    weight: 180,
    avaliation: "4.3 estrelas",
    price: "1.000",
    vehiclePlate: "OKL-4797",
  },
  {
    name: "João",
    email: "joao@outlook.com",
    password: 9658,
    cpf: "123485479102",
    weight: 320,
    avaliation: "4.8 estrelas",
    price: "2.000",
    vehiclePlate: "ADC-8521",
  },
];

const user = prompt("Bem vindo(a) ao Ifrete, qual o seu nome?");

const showSummary = (user, chosenDriver) => {
  const driver = drivers.find((driver) => driver.name === chosenDriver);

  if (!driver) {
    alert("Motorista não encontrado!");
    return;
  }

  const summary = `
Cliente: ${user}
Motorista: ${driver.name}
CPF do motorista: ${driver.cpf}
Placa do veículo: ${driver.vehiclePlate}
Peso suportado pelo motorista: ${driver.weight}kg
Valor que será pago pelo cartão de crédito: ${driver.price}`;

  alert(summary);
  alert("Obrigada por confiar no Ifrete! Até a próxima!!!");

  const fs = require("fs");

  const dataJson = JSON.stringify(summary);
  const fileName = "dados.json";

  fs.writeFile(fileName, dataJson, (err) => {
    if (err) {
      console.error("ocorreu um erro na gravação", err);
      return;
    }
    console.log("Arquivo Json criado com sucesso!");
  });
};

const loadOption = () => {
  let returnToMenu = false;

  while (!returnToMenu) {
    const message =
      prompt(`Olá ${user}! O que deseja fazer? (Digite a opção que deseja) \n
1 - Listar todos os motoristas de frete
2 - Informar o peso em kg da carga a ser transportada`);

    if (message === "1") {
      const listDetails = drivers.map((driver) => {
        return `Motorista: ${driver.name}, Carga Suportada em kg: ${driver.weight}, Avaliação: ${driver.avaliation}`;
      });

      alert(`Aqui está a lista dos Motoristas:\n\n${listDetails.join("\n")}`);
    } else if (message === "2") {
      const weightLoad = prompt(
        `Digite abaixo a opção que melhor se enquadra na carga que será transportada: \n 
    1 - 50kg - 300kg
    2 - 301kg - 500kg
    3 - 501kg - 950kg`
      );
      let availableDrivers = [];

      if (weightLoad === "1") {
        availableDrivers = drivers.filter(
          (driver) => driver.weight >= 50 && driver.weight <= 300
        );
      } else if (weightLoad === "2") {
        availableDrivers = drivers.filter(
          (driver) => driver.weight >= 301 && driver.weight <= 500
        );
      } else if (weightLoad === "3") {
        availableDrivers = drivers.filter(
          (driver) => driver.weight >= 501 && driver.weight <= 950
        );
      }

      if (availableDrivers.length > 0) {
        const driverNames = availableDrivers.map((driver) => driver.name);
        alert(
          `Os motoristas disponíveis para transportar essa carga são: ${driverNames.join(
            ", "
          )}`
        );

        const chooseDriver = prompt(`Digite o nome do motorista que deseja:`);
        if (chooseDriver) {
          const confirmation = confirm(
            `Você escolheu o motorista ${chooseDriver}. Deseja continuar com essa escolha?`
          );
          if (confirmation) {
            showSummary(user, chooseDriver);
          }
        } else {
          alert("Nenhum motorista selecionado.");
          returnToMenu = true;
        }
      } else {
        alert("Nenhum motorista disponível para transportar essa carga.");
      }

      returnToMenu = true;
    }
  }
};

loadOption();
