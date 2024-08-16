'use client';
import React, { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import axios, { AxiosError } from 'axios';
import { createClient } from '@/utils/supabase/client';

interface OptionType {
    value: string;
    label: string;
}

const supabase = createClient();

const Regression: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    const [targetOption, setTargetOption] = useState<OptionType | null>(null);
    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
    const [predictionResult, setPredictionResult] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    // Separate states for dropdown options
    const [genderOptions, setGenderOptions] = useState<OptionType[]>([]);
    const [primaryBreedOptions, setPrimaryBreedOptions] = useState<OptionType[]>([]);
    const [secondaryBreedOptions, setSecondaryBreedOptions] = useState<OptionType[]>([]);

    // Define options for Neutered as it's a boolean field
    const neuteredOptions: OptionType[] = [
        { value: 'True', label: 'Yes' },
        { value: 'False', label: 'No' }
    ];

    const vars: OptionType[] = [
        { value: 'Primary_Breed', label: 'Primary Breed' },
        { value: 'Gender', label: 'Gender' },
        { value: 'Neutered', label: 'Neutered status' },
        { value: 'Age', label: 'Age' },
        { value: 'LifeTimeStats_TimePlayed', label: 'Time Played' },
        { value: 'LifeTimeStats_TreatsWon', label: 'Treats Won' },
        { value: 'LifeTimeStats_SuccessRate', label: 'Success Rate' },
        { value: 'LifeTimeStats_TotalPrompts', label: 'Total Prompts' },
        { value: 'LifeTimeStats_TotalMissed', label: 'Total Missed' },
    ];

    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedOptions(newValue as OptionType[]);
        const newInputValues = newValue.reduce((acc, option) => {
            acc[option.value] = '';
            return acc;
        }, {} as { [key: string]: string });
        setInputValues(newInputValues);

        // Fetch dropdown options for any field that requires it
        newValue.forEach(async (option) => {
            switch (option.value) {
                case 'Gender':
                    await fetchDropdownOptions('Gender', setGenderOptions);
                    break;
                case 'Primary_Breed':
                    await fetchDropdownOptions('Primary_Breed', setPrimaryBreedOptions);
                    break;
                case 'Secondary_Breed':
                    await fetchDropdownOptions('Secondary_Breed', setSecondaryBreedOptions);
                    break;
                default:
                    break;
            }
        });
    };

    const fetchDropdownOptions = async (field: string, setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>) => {
        try {
            const { data, error } = await supabase
                .from('DogsCombined')  // Replace with your actual table name
                .select(field)
                .neq(field, '');  // Filter out any empty values

            if (error) throw error;

            const uniqueValues = Array.from(new Set(data.map((item: any) => item[field])));
            const dropdownOptions = uniqueValues.map((value: string) => ({ value, label: value }));
            setOptions(dropdownOptions);
        } catch (error) {
            console.error(`Error fetching ${field} dropdown data:`, error);
        }
    };

    const handleTargetChange = (target: OptionType | null) => {
        setTargetOption(target);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        setInputValues({ ...inputValues, [field]: e.target.value });
    };

    const handleRunModel = async () => {
        if (!targetOption || selectedOptions.length === 0) {
            alert('Please select parameters and a target.');
            return;
        }

        const data = {
            parameters: selectedOptions.map(option => option.value),
            target: targetOption.value,
            targetDog: inputValues
        };

        try {
            const response = await axios.post('https://flask-app-puppod-ff2b40132f16.herokuapp.com/predict', data);
            setPredictionResult(JSON.stringify(response.data, null, 2));  // Display the entire response
            setErrorMessage(''); // Clear any previous errors
        } catch (error: unknown) {
            let errorMsg = 'Failed to get a prediction.';
            if (axios.isAxiosError(error)) {
                errorMsg = error.response?.data || error.message;
            } else {
                errorMsg = `Unexpected error: ${error}`;
            }
            setPredictionResult('');
            setErrorMessage(`Error: ${errorMsg}\nData Sent: ${JSON.stringify(data, null, 2)}`);
        }
    };

    const renderInputField = (option: OptionType) => {
        switch (option.value) {
            case 'Gender':
                return (
                    <Select
                        options={genderOptions}
                        onChange={(selectedOption) =>
                            setInputValues({ ...inputValues, [option.value]: selectedOption ? selectedOption.value : '' })
                        }
                        value={genderOptions.find((opt) => opt.value === inputValues[option.value]) || null}
                    />
                );
            case 'Primary_Breed':
                return (
                    <Select
                        options={primaryBreedOptions}
                        onChange={(selectedOption) =>
                            setInputValues({ ...inputValues, [option.value]: selectedOption ? selectedOption.value : '' })
                        }
                        value={primaryBreedOptions.find((opt) => opt.value === inputValues[option.value]) || null}
                    />
                );
            case 'Secondary_Breed':
                return (
                    <Select
                        options={secondaryBreedOptions}
                        onChange={(selectedOption) =>
                            setInputValues({ ...inputValues, [option.value]: selectedOption ? selectedOption.value : '' })
                        }
                        value={secondaryBreedOptions.find((opt) => opt.value === inputValues[option.value]) || null}
                    />
                );
            case 'Neutered':
                return (
                    <Select
                        options={neuteredOptions}
                        onChange={(selectedOption) =>
                            setInputValues({ ...inputValues, [option.value]: selectedOption ? selectedOption.value : '' })
                        }
                        value={neuteredOptions.find((opt) => opt.value === inputValues[option.value]) || null}
                    />
                );
            default:
                return (
                    <input
                        className='bg-[#f2f2f2] p-2 text-md text-black w-full'
                        type='text'
                        placeholder={`Enter ${option.label}`}
                        value={inputValues[option.value]}
                        onChange={(e) => handleInputChange(e, option.value)}
                    />
                );
        }
    };

    return (
        <div className='text-black flex flex-col justify-center'>
            <h1 className='mx-auto mt-10 mb-5 text-black text-4xl font-bold'>Prediction Model</h1>
            <div className='w-4/5 mx-auto'>
                <label>
                    <h1 className='mt-5 text-md font-semibold mb-2'>Select independent variables:</h1>
                    <Select
                        isMulti
                        options={vars}
                        onChange={handleChange}
                        value={selectedOptions}
                    />
                </label>
                <label>
                    <h1 className='mt-5 text-md font-semibold mb-2'>Select target field to predict:</h1>
                    <Select
                        options={vars}
                        value={targetOption}
                        onChange={handleTargetChange}
                    />
                </label>
                <h1 className='mt-5 text-md font-semibold mb-2'>Enter values for selected variables</h1>
                {selectedOptions.map(option => (
                    <div key={option.value} className='mb-4'>
                        <label className='block text-md font-semibold mb-2'>
                            {option.label}:
                        </label>
                        {renderInputField(option)}
                    </div>
                ))}
                <button
                    onClick={handleRunModel}
                    className='bg-blue-500 text-white p-2 rounded-md shadow-md mb-5'
                >
                    Run Model
                </button>

                <div className='flex flex-col justify-content'>
                    <h1 className='text-3xl font-semibold mb-2 text-center'>Output</h1>
                    <pre className='text-md bg-[#f2f2f2] p-4 border-4 rounded-md shadow-md'>
                        {predictionResult || errorMessage || 'N/A'}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default Regression;
