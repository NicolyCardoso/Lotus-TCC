
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_PROJETOS = '@lotus:projetos';

export async function salvarProjetos(projetos) {
  try {
    await AsyncStorage.setItem(
      CHAVE_PROJETOS,
      JSON.stringify(projetos)
    );
  } catch (error) {
    console.error('Erro ao salvar projetos:', error);
  }
}

export async function carregarProjetos() {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_PROJETOS);
    return dados ? JSON.parse(dados) : [];
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    return [];
  }
}