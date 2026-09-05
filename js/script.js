/* =========================================
   NEXTEC
   CALCULADORA DE INVESTIMENTO
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("NEXTEC - Calculadora iniciada");


    /* =========================================
       ELEMENTOS
    ========================================= */

    const steps = document.querySelectorAll(".calculator-step");

    const nextButton = document.getElementById("nextButton");

    const prevButton = document.getElementById("prevButton");

    const progressBar = document.getElementById("progressBar");

    const stepText = document.getElementById("stepText");

    const resultBox = document.getElementById("calculatorResult");

    const resultPrice = document.getElementById("resultPrice");

    const resultDetails = document.getElementById("resultDetails");

    const whatsappButton =
        document.getElementById("whatsappButton");


    /* =========================================
       VERIFICAÇÃO
    ========================================= */

    console.log("Etapas encontradas:", steps.length);


    if (steps.length === 0) {

        console.error(
            "ERRO: Nenhuma etapa da calculadora foi encontrada."
        );

        return;

    }


    if (!nextButton) {

        console.error(
            "ERRO: Botão nextButton não encontrado."
        );

        return;

    }


    /* =========================================
       CONFIGURAÇÃO
    ========================================= */

    let currentStep = 1;

    const totalSteps = 5;


    /* =========================================
       MOSTRAR ETAPA
    ========================================= */

    function showStep(step) {

        console.log(
            "Mostrando etapa:",
            step
        );


        /* Esconde todas as etapas */

        steps.forEach(function (item) {

            item.classList.remove("active");

        });


        /* Encontra a etapa atual */

        const selectedStep =
            document.querySelector(
                '.calculator-step[data-step="' + step + '"]'
            );


        if (!selectedStep) {

            console.error(
                "Etapa não encontrada:",
                step
            );

            return;

        }


        /* Mostra a etapa */

        selectedStep.classList.add("active");


        /* =========================================
           BARRA DE PROGRESSO
        ========================================= */

        const percentage =
            (step / totalSteps) * 100;


        if (progressBar) {

            progressBar.style.width =
                percentage + "%";

        }


        if (stepText) {

            stepText.textContent =
                step + " de " + totalSteps;

        }


        /* =========================================
           BOTÃO VOLTAR
        ========================================= */

        if (prevButton) {

            if (step === 1) {

                prevButton.style.visibility =
                    "visible";

            } else {

                prevButton.style.visibility =
                    "visible";

            }

        }


        /* =========================================
           BOTÃO CONTINUAR
        ========================================= */

        if (step === totalSteps) {

            nextButton.textContent =
                "Calcular investimento →";

        } else {

            nextButton.textContent =
                "Continuar →";

        }

    }


    /* =========================================
       VALIDAR ETAPA
    ========================================= */

    function validateStep() {


        /* ETAPA 1
           Tipo de projeto
        */

        if (currentStep === 1) {

            const selected =
                document.querySelector(
                    'input[name="projectType"]:checked'
                );


            if (!selected) {

                alert(
                    "Selecione o tipo de projeto para continuar."
                );

                return false;

            }


            return true;

        }


        /* ETAPA 2
           Complexidade
        */

        if (currentStep === 2) {

            const selected =
                document.querySelector(
                    'input[name="complexity"]:checked'
                );


            if (!selected) {

                alert(
                    "Selecione o nível de complexidade para continuar."
                );

                return false;

            }


            return true;

        }


        /* ETAPA 3
           Funcionalidades

           É opcional selecionar funcionalidades.
        */

        if (currentStep === 3) {

            return true;

        }


        /* ETAPA 4
           Design
        */

        if (currentStep === 4) {

            const selected =
                document.querySelector(
                    'input[name="design"]:checked'
                );


            if (!selected) {

                alert(
                    "Selecione uma opção de design para continuar."
                );

                return false;

            }


            return true;

        }


        /* ETAPA 5
           Prazo
        */

        if (currentStep === 5) {

            const selected =
                document.querySelector(
                    'input[name="deadline"]:checked'
                );


            if (!selected) {

                alert(
                    "Selecione o prazo desejado."
                );

                return false;

            }


            return true;

        }


        return true;

    }


    /* =========================================
       CALCULAR INVESTIMENTO
    ========================================= */

    function calculateInvestment() {

        console.log(
            "Calculando investimento..."
        );


        let total = 0;


        /* =========================================
           TIPO DE PROJETO
        ========================================= */

        const project =
            document.querySelector(
                'input[name="projectType"]:checked'
            );


        if (project) {

            total += Number(
                project.dataset.price || 0
            );

        }


        /* =========================================
           COMPLEXIDADE
        ========================================= */

        const complexity =
            document.querySelector(
                'input[name="complexity"]:checked'
            );


        if (complexity) {

            total += Number(
                complexity.dataset.price || 0
            );

        }


        /* =========================================
           FUNCIONALIDADES
        ========================================= */

        const features =
            document.querySelectorAll(
                '.feature-option input:checked'
            );


        features.forEach(function (feature) {

            total += Number(
                feature.value || 0
            );

        });


        /* =========================================
           DESIGN
        ========================================= */

        const design =
            document.querySelector(
                'input[name="design"]:checked'
            );


        if (design) {

            total += Number(
                design.dataset.price || 0
            );

        }


        /* =========================================
           PRAZO
        ========================================= */

        const deadline =
            document.querySelector(
                'input[name="deadline"]:checked'
            );


        if (deadline) {

            total += Number(
                deadline.dataset.price || 0
            );

        }


        console.log(
            "Valor final:",
            total
        );


        /* =========================================
           MOSTRAR VALOR
        ========================================= */

        if (resultPrice) {

            resultPrice.textContent =
                total.toLocaleString("pt-BR");

        }


        /* =========================================
           MOSTRAR DETALHES
        ========================================= */

        if (resultDetails) {

            resultDetails.innerHTML = `

                <div>
                    <strong>Projeto:</strong>
                    ${getProjectName(project ? project.value : null)}
                </div>

                <div>
                    <strong>Complexidade:</strong>
                    ${getComplexityName(
                        complexity ? complexity.value : null
                    )}
                </div>

                <div>
                    <strong>Funcionalidades:</strong>
                    ${features.length} selecionadas
                </div>

                <div>
                    <strong>Design:</strong>
                    ${getDesignName(
                        design ? design.value : null
                    )}
                </div>

                <div>
                    <strong>Prazo:</strong>
                    ${getDeadlineName(
                        deadline ? deadline.value : null
                    )}
                </div>

            `;

        }


        /* =========================================
           ESCONDER ETAPAS
        ========================================= */

        steps.forEach(function (item) {

            item.classList.remove("active");

        });


        /* =========================================
           ESCONDER NAVEGAÇÃO
        ========================================= */

        const navigation =
            document.querySelector(
                ".calculator-navigation"
            );


        if (navigation) {

            navigation.style.display =
                "none";

        }


        /* =========================================
           ESCONDER PROGRESSO
        ========================================= */

        const progress =
            document.querySelector(
                ".calculator-progress"
            );


        if (progress) {

            progress.style.display =
                "none";

        }
	calculatorResult.classList.add("active");


        /* =========================================
           MOSTRAR RESULTADO
        ========================================= */

        if (resultBox) {

            resultBox.classList.add("show");

        }


        /* =========================================
           GERAR LINK WHATSAPP
        ========================================= */

        createWhatsAppLink(total);

    }


    /* =========================================
       NOMES DOS PROJETOS
    ========================================= */

    function getProjectName(value) {

        const names = {

            site: "Site institucional",

            landing: "Landing Page",

            loja: "Loja virtual",

            sistema: "Sistema personalizado",

            dashboard: "Dashboard",

            automacao: "Automação"

        };


        return names[value] || "Não informado";

    }


    /* =========================================
       NOMES DA COMPLEXIDADE
    ========================================= */

    function getComplexityName(value) {

        const names = {

            basic: "Básico",

            medium: "Intermediário",

            advanced: "Avançado"

        };


        return names[value] || "Não informado";

    }


    /* =========================================
       NOMES DO DESIGN
    ========================================= */

    function getDesignName(value) {

        const names = {

            template: "Design personalizado",

            exclusive: "Design exclusivo"

        };


        return names[value] || "Não informado";

    }


    /* =========================================
       NOMES DO PRAZO
    ========================================= */

    function getDeadlineName(value) {

        const names = {

            normal: "Prazo normal",

            priority: "Prioridade"

        };


        return names[value] || "Não informado";

    }


    /* =========================================
       WHATSAPP
    ========================================= */

    function createWhatsAppLink(total) {

        if (!whatsappButton) {

            return;

        }


        const project =
            document.querySelector(
                'input[name="projectType"]:checked'
            );


        const complexity =
            document.querySelector(
                'input[name="complexity"]:checked'
            );


        const design =
            document.querySelector(
                'input[name="design"]:checked'
            );


        const deadline =
            document.querySelector(
                'input[name="deadline"]:checked'
            );


        const features =
            document.querySelectorAll(
                '.feature-option input:checked'
            );


        let message =
            "Olá, NEXTEC! Fiz uma simulação de investimento no site.%0A%0A";


        message +=
            "Projeto: " +
            getProjectName(
                project ? project.value : null
            ) +
            "%0A";


        message +=
            "Complexidade: " +
            getComplexityName(
                complexity ? complexity.value : null
            ) +
            "%0A";


        message +=
            "Design: " +
            getDesignName(
                design ? design.value : null
            ) +
            "%0A";


        message +=
            "Prazo: " +
            getDeadlineName(
                deadline ? deadline.value : null
            ) +
            "%0A";


        /* FUNCIONALIDADES */

        if (features.length > 0) {

            message +=
                "Funcionalidades: ";


            features.forEach(
                function (feature, index) {

                    if (index > 0) {

                        message +=
                            ", ";

                    }


                    message +=
                        feature.dataset.name;

                }
            );


            message += "%0A";

        }


        /* VALOR */

        message +=
            "%0AInvestimento estimado: R$ " +
            total.toLocaleString("pt-BR");


        /*
        =========================================
        COLOQUE O WHATSAPP DA NEXTEC AQUI
        =========================================

        Exemplo:

        5511999999999

        55 = Brasil
        11 = São Paulo
        restante = número

        NÃO use:
        +
        espaços
        parênteses
        hífen
        */

        const phone =
            "5511999999999";


        whatsappButton.href =
            "https://wa.me/" +
            phone +
            "?text=" +
            message;

    }


    /* =========================================
       BOTÃO CONTINUAR
    ========================================= */

    nextButton.addEventListener(
        "click",
        function () {

            console.log(
                "Botão CONTINUAR clicado"
            );


            /* Verifica a etapa */

            if (!validateStep()) {

                return;

            }


            /* Vai para próxima etapa */

            if (currentStep < totalSteps) {

                currentStep++;

                showStep(currentStep);

            } else {

                /* Última etapa */

                calculateInvestment();

            }

        }
    );


    /* =========================================
       BOTÃO VOLTAR
    ========================================= */
 if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Botão VOLTAR clicado"
                );

    // Navegação normal
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }

            }
        );

    }



    /* =========================================
       INICIAR CALCULADORA
    ========================================= */

    showStep(currentStep);


});