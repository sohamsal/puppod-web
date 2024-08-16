'use client';
import React, { useState } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';

// Define the format for options
interface OptionType {
    value: string;
    label: string;
}

const Regression: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    const [targetOption, setTargetOption] = useState<OptionType | null>(null);

    // Define options in the format expected by react-select
    const vars: OptionType[] = [
        { value: 'Primary_Breed', label: 'Primary Breed' },
        { value: 'Gender', label: 'Gender' },
        { value: 'Neutered', label: 'Neutered status' },
        { value: 'Age', label: 'Age' },
        { value: 'TimePlayed', label: 'Time Played' },
        { value: 'TreatsWon', label: 'Treats Won' },
        { value: 'SuccessRate', label: 'Success Rate' },
        { value: 'TotalPrompts', label: 'Total Prompts' },
        { value: 'TotalMissed', label: 'Total Missed' },
    ];

    const handleChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        setSelectedOptions(newValue as OptionType[]);
    };

    const handleTargetChange = (target: OptionType | null) => {
        setTargetOption(target);
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
                <h1 className='mt-5 text-md font-semibold mb-2'>Instructions</h1>
                <div className='p-4 bg-[#f2f2f2] flex justify-content text-center'>
                    <h1>[instructions to input text as JSON input]</h1>
                </div>
                <h1 className='mt-5 text-md font-semibold mb-2'>Enter JSON input below</h1>
                <input className='bg-[#f2f2f2] p-4 text-md text-black w-full mb-10' placeholder='start typing here...' />

                <div className='flex flex-col justify-content'>
                    <h1 className='text-3xl font-semibold mb-2 text-center'>Output</h1>
                    <h1 className='text-md bg-[#f2f2f2] p-4 border-4 rounded-md shadow-md'>
                        The predicted {targetOption?.label.toLocaleLowerCase() || 'N/A'} is
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Regression;
