import React from 'react';
import { ActivationScreen } from './components/ActivationScreen';
import { BlockchainSelector } from './components/BlockchainSelector';
import { MainApp } from './components/MainApp';
import { useAppState } from './hooks/useAppState';
import { VALID_ACTIVATION_KEYS } from './utils/constants';

function App() {
  const { state, updateState, startSearch, pauseSearch, addMessage } = useAppState();

  const handleActivation = () => {
    updateState({ 
      isActivated: true, 
      currentScreen: 'blockchains' 
    });
  };

  const handleBlockchainSelection = (selectedChains: string[]) => {
    updateState({ 
      selectedBlockchains: selectedChains, 
      currentScreen: 'main' 
    });
  };

  if (!state.isActivated) {
    return <ActivationScreen onActivate={handleActivation} />;
  }

  if (state.currentScreen === 'blockchains') {
    return <BlockchainSelector onContinue={handleBlockchainSelection} />;
  }

  return (
    <MainApp
      state={state}
      onUpdateState={updateState}
      onStartSearch={startSearch}
      onPauseSearch={pauseSearch}
      onSendMessage={addMessage}
    />
  );
}

export default App;