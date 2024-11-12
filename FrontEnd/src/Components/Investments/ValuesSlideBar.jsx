import { useEffect, useState } from "react";
import ApexChart from "./graphic";

const ValuesSlideBar = () => {
    const [labelValueMoney, setLabelValueMoney] = useState(0);
    const [labelValueMonth, setLabelValueMonth] = useState(1);
    const referentialTax = 0.005;
    const referentialTaxTesouroDireto = 13.75;

    const [calculatedValueSavings, setCalculatedValueSavings] = useState(0);
    const [calculatedValueSavingsTesouroDireto, setCalculatedValueSavingsTesouroDireto] = useState(0);

    const calculateSavingsInvestment = () => {
        try {
            // Corrigido a lógica para calcular o valor do investimento
            setCalculatedValueSavings(labelValueMoney * referentialTax * labelValueMonth);
        } catch (error) {
            console.log("Não foi possível fazer o cálculo. [erro]: ", error);
        }
    };

    const calculateSavingsInvestmentTesouroDireto = () => {
        try {
            // Calculando a taxa mensal a partir da taxa anual
            let valorMensalTaxa = referentialTaxTesouroDireto / 12 / 100; // Dividimos por 12 e convertemos para decimal
            valorMensalTaxa = valorMensalTaxa + 1; // Adicionamos 1 para o fator de multiplicação (1 + taxa mensal)

            // Calculando o valor com juros compostos para o número de meses
            let valorComJuros = labelValueMoney * Math.pow(valorMensalTaxa, labelValueMonth);

            // Calculando o lucro obtido
            let lucro = valorComJuros - labelValueMoney;

            // Imposto de Renda: 22,5% para até 6 meses de investimento
            let imposto = lucro * 22.5 / 100;

            // Valor final após o imposto de renda
            let valorFinal = valorComJuros - imposto;

            // Atualizando o estado com o valor final
            setCalculatedValueSavingsTesouroDireto(valorFinal);
        } catch (error) {
            console.log("Não foi possível fazer o cálculo. [erro]: ", error);
        }
    };

    // Atualiza o valor do cálculo quando `labelValueMoney` ou `labelValueMonth` muda
    useEffect(() => {
        calculateSavingsInvestment();
        calculateSavingsInvestmentTesouroDireto();
    }, [labelValueMoney, labelValueMonth]);

    return (
        <div className="flex justify-center items-center gap-10">
            {/* Componente para pegar os valores e colocá-los em um estado */}
            <div className="flex flex-col w-[580px] h-[400px] items-center justify-center space-y-4 bg-[#0D0D0D] rounded-xl p-6">
                <h3 className="text-[#B6B6B6] text-xl">Eu tenho R${labelValueMoney}</h3>
                <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={labelValueMoney}
                    onChange={(e) => setLabelValueMoney(Number(e.target.value))}
                    className="w-[90%] h-1 bg-[#B6B6B6] rounded-full appearance-none outline-none accent-[#B6B6B6] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600"
                />
                <h3 className="text-[#B6B6B6] text-xl">
                    Aplicar durante {labelValueMonth} {labelValueMonth > 1 ? "meses" : "mês"}
                </h3>
                <input
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={labelValueMonth}
                    onChange={(e) => setLabelValueMonth(Number(e.target.value))}
                    className="w-[90%] h-1 bg-[#B6B6B6] rounded-full appearance-none outline-none accent-[#B6B6B6] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-600"
                />
            </div>

            {/* Gráfico com o valor calculado */}
            <div className="flex w-[580px] h-[400px] items-center justify-center space-y-4 bg-[#0D0D0D] rounded-xl">
                <ApexChart
                    calculatedValueSavings={calculatedValueSavings}
                    labelValueMoney={labelValueMoney}
                    calculatedValueSavingsTesouroDireto={calculatedValueSavingsTesouroDireto}
                />
            </div>
        </div>
    );
};

export default ValuesSlideBar;
