import { type ReactElement, useState } from 'react'

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	const nextStep = async () => {
		setCurrentStepIndex((index) => {
			return index >= steps.length - 1 ? index : index + 1
		})
	}

	function previousStep() {
		setCurrentStepIndex((index) => {
			return index <= 0 ? index : index - 1
		})
	}

	function goToIndex(index: number) {}

	return {
		currentStepIndex,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		step: steps[currentStepIndex],
		goToIndex,
		nextStep,
		previousStep,
		steps,
	}
}
