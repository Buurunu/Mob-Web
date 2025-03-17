import React from "react";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
    format?: 'phone' | 'cpfOrCnpj'; // Tipos de formatação suportados
}

export default function Input({ type, value, onChange, placeholder, required, format }: InputProps) {
    // Função para formatar o valor com base no tipo de formatação
    const formatValue = (inputValue: string, formatType?: 'phone' | 'cpfOrCnpj') => {
        let formattedValue = inputValue;

        // Aplica a remoção de caracteres não numéricos apenas para 'phone' e 'cpfOrCnpj'
        if (formatType === 'phone' || formatType === 'cpfOrCnpj') {
            formattedValue = inputValue.replace(/\D/g, ''); // Remove tudo que não for dígito
        }

        switch (formatType) {
            case 'phone':
                // Formatação para telefone: (XX) XXXXX-XXXX
                if (formattedValue.length >= 11) {
                    formattedValue = `(${formattedValue.slice(0, 2)}) ${formattedValue.slice(2, 7)}-${formattedValue.slice(7, 11)}`;
                } else if (formattedValue.length >= 6) {
                    formattedValue = `(${formattedValue.slice(0, 2)}) ${formattedValue.slice(2, 6)}-${formattedValue.slice(6, 10)}`;
                } else if (formattedValue.length > 2) {
                    formattedValue = `(${formattedValue.slice(0, 2)}) ${formattedValue.slice(2)}`;
                }
                break;

            case 'cpfOrCnpj':
                // Detecta se é CPF (11 dígitos) ou CNPJ (14 dígitos)
                if (formattedValue.length <= 11) {
                    // Formatação CPF
                    if (formattedValue.length >= 9) {
                        formattedValue = `${formattedValue.slice(0, 3)}.${formattedValue.slice(3, 6)}.${formattedValue.slice(6, 9)}-${formattedValue.slice(9, 11)}`;
                    } else if (formattedValue.length >= 6) {
                        formattedValue = `${formattedValue.slice(0, 3)}.${formattedValue.slice(3, 6)}.${formattedValue.slice(6)}`;
                    } else if (formattedValue.length >= 3) {
                        formattedValue = `${formattedValue.slice(0, 3)}.${formattedValue.slice(3)}`;
                    }
                } else {
                    // Formatação CNPJ
                    if (formattedValue.length >= 14) {
                        formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2, 5)}.${formattedValue.slice(5, 8)}/${formattedValue.slice(8, 12)}-${formattedValue.slice(12, 14)}`;
                    } else if (formattedValue.length >= 8) {
                        formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2, 5)}.${formattedValue.slice(5, 8)}/${formattedValue.slice(8)}`;
                    } else if (formattedValue.length >= 5) {
                        formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2, 5)}.${formattedValue.slice(5)}`;
                    } else if (formattedValue.length >= 2) {
                        formattedValue = `${formattedValue.slice(0, 2)}.${formattedValue.slice(2)}`;
                    }
                }
                break;

            default:
                // Sem formatação
                break;
        }

        return formattedValue;
    };

    // Função chamada quando o valor do input muda
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value; // Valor bruto do input
        const formattedValue = formatValue(rawValue, format); // Aplica a formatação

        // Chama a função onChange passada pelo pai com o valor formatado
        onChange({
            ...e,
            target: {
                ...e.target,
                value: formattedValue,
            },
        });
    };

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            maxLength={format === 'phone' ? 15 : format === 'cpfOrCnpj' ? 18 : undefined} // Define o maxLength com base no formato
        />
    );
}