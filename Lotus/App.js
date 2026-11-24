
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';

import {
  salvarProjetos,
  carregarProjetos,
} from './storage';

const C = {
  fundo: '#F5F3EC',
  branco: '#FFFFFF',
  verde: '#405B46',
  verdeEscuro: '#304735',
  sálvia: '#84977D',
  verdeClaro: '#E5EBDD',
  areia: '#EDE5D8',
  marrom: '#98765A',
  texto: '#33382F',
  cinza: '#85877E',
  linha: '#E6E4DA',
};

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [projetos, setProjetos] = useState([]);
  const [nome, setNome] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    async function carregar() {
      const dados = await carregarProjetos();
      setProjetos(dados);
    }

    carregar();
  }, []);

  async function atualizarProjetos(lista) {
    setProjetos(lista);
    await salvarProjetos(lista);
  }

  async function criarProjeto() {
    if (!nome.trim() || !ambiente.trim()) {
      Alert.alert(
        'Faltam informações',
        'Preencha o nome do projeto e o ambiente.'
      );
      return;
    }

    const novo = {
      id: Date.now().toString(),
      nome: nome.trim(),
      ambiente: ambiente.trim(),
      descricao: descricao.trim(),
    };

    await atualizarProjetos([...projetos, novo]);

    setNome('');
    setAmbiente('');
    setDescricao('');

    Alert.alert('Tudo certo!', 'Seu projeto foi criado com sucesso.');
  }

  function excluirProjeto(id) {
    Alert.alert(
      'Excluir projeto',
      'Deseja realmente excluir este projeto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const lista = projetos.filter(
              (item) => item.id !== id
            );
            atualizarProjetos(lista);
          },
        },
      ]
    );
  }

  function irPara(t) {
    setTela(t);
  }

  function cabecalho() {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLegenda}>
            PAISAGISMO & DESIGN DE INTERIORES
          </Text>
          <Text style={styles.logo}>lotus<Text style={styles.ponto}>.</Text></Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>L</Text>
        </View>
      </View>
    );
  }

  function navegacao() {
    return (
      <View style={styles.nav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => irPara('inicio')}
        >
          <Text style={[
            styles.navIcon,
            tela === 'inicio' && styles.navAtivo,
          ]}>⌂</Text>
          <Text style={[
            styles.navTexto,
            tela === 'inicio' && styles.navAtivo,
          ]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => irPara('projetos')}
        >
          <Text style={[
            styles.navIcon,
            tela === 'projetos' && styles.navAtivo,
          ]}>▧</Text>
          <Text style={[
            styles.navTexto,
            tela === 'projetos' && styles.navAtivo,
          ]}>Projetos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function inicio() {
    return (
      <>
        {cabecalho()}

        <View style={styles.hero}>
          <View style={styles.heroConteudo}>
            <Text style={styles.heroEtiqueta}>
              UM NOVO OLHAR PARA SEU ESPAÇO
            </Text>

            <Text style={styles.heroTitulo}>
              Ambientes que contam histórias.
            </Text>

            <Text style={styles.heroDescricao}>
              Inspire-se, planeje e transforme cada cantinho
              em um lugar que tenha a sua essência.
            </Text>

            <TouchableOpacity
              style={styles.heroBotao}
              onPress={() => irPara('projetos')}
            >
              <Text style={styles.heroBotaoTexto}>
                Explorar projetos  →
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.heroFolha}>❧</Text>
          <Text style={styles.heroNumero}>01 / 03</Text>
        </View>

        <View style={styles.resumo}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>
              {projetos.length.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.resumoLegenda}>Projetos criados</Text>
          </View>

          <View style={styles.resumoLinha} />

          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>∞</Text>
            <Text style={styles.resumoLegenda}>Novas possibilidades</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <View style={styles.secaoCabecalho}>
            <View>
              <Text style={styles.secaoEtiqueta}>COMECE POR AQUI</Text>
              <Text style={styles.secaoTitulo}>Explore o Lotus</Text>
            </View>
            <Text style={styles.secaoDecoracao}>✳</Text>
          </View>

          <TouchableOpacity
            style={styles.acaoCard}
            onPress={() => irPara('projetos')}
          >
            <View style={[styles.acaoIcone, { backgroundColor: C.verdeClaro }]}>
              <Text style={styles.acaoEmoji}>🏡</Text>
            </View>

            <View style={styles.acaoInfo}>
              <Text style={styles.acaoTitulo}>Meus projetos</Text>
              <Text style={styles.acaoDescricao}>
                Crie e organize seus ambientes.
              </Text>
            </View>

            <Text style={styles.acaoSeta}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acaoCard}
            onPress={() => Alert.alert('Em breve', 'A área de inspirações estará disponível em breve.')}
          >
            <View style={[styles.acaoIcone, { backgroundColor: C.areia }]}>
              <Text style={styles.acaoEmoji}>🪴</Text>
            </View>

            <View style={styles.acaoInfo}>
              <Text style={styles.acaoTitulo}>Inspirações</Text>
              <Text style={styles.acaoDescricao}>
                Descubra ideias para transformar espaços.
              </Text>
            </View>

            <Text style={styles.acaoSeta}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acaoCard}
            onPress={() => Alert.alert('Em breve', 'A área de plantas estará disponível em breve.')}
          >
            <View style={[styles.acaoIcone, { backgroundColor: '#E9E9DD' }]}>
              <Text style={styles.acaoEmoji}>🌿</Text>
            </View>

            <View style={styles.acaoInfo}>
              <Text style={styles.acaoTitulo}>Universo das plantas</Text>
              <Text style={styles.acaoDescricao}>
                Conheça espécies e possibilidades.
              </Text>
            </View>

            <Text style={styles.acaoSeta}>↗</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dica}>
          <Text style={styles.dicaEtiqueta}>INSPIRAÇÃO DO DIA</Text>
          <Text style={styles.dicaTitulo}>
            A beleza está nos detalhes.
          </Text>
          <Text style={styles.dicaTexto}>
            Materiais naturais, iluminação suave e elementos
            verdes podem trazer aconchego e personalidade
            para qualquer ambiente.
          </Text>
          <Text style={styles.dicaFolha}>🌱</Text>
        </View>

        <View style={styles.rodape}>
          <Text style={styles.rodapeLogo}>lotus.</Text>
          <Text style={styles.rodapeTexto}>
            Cultive ideias. Transforme espaços.
          </Text>
          <Text style={styles.rodapeFinal}>
            FEITO PARA FLORESCER
          </Text>
        </View>
      </>
    );
  }

  function projetosScreen() {
    return (
      <>
        {cabecalho()}

        <View style={styles.projetosTopo}>
          <Text style={styles.secaoEtiqueta}>SEU ESPAÇO, SUAS IDEIAS</Text>
          <Text style={styles.projetosTitulo}>Meus projetos</Text>
          <Text style={styles.projetosDescricao}>
            Cada transformação começa com uma ideia.
            Organize seus planos por aqui.
          </Text>
        </View>

        <View style={styles.formulario}>
          <Text style={styles.formEtiqueta}>NOVO PLANEJAMENTO</Text>
          <Text style={styles.formTitulo}>Vamos criar algo?</Text>
          <Text style={styles.formDescricao}>
            Conte um pouco sobre o ambiente que deseja transformar.
          </Text>

          <Text style={styles.label}>Nome do projeto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Meu cantinho favorito"
            placeholderTextColor={C.cinza}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Tipo de ambiente *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Sala, quarto, jardim..."
            placeholderTextColor={C.cinza}
            value={ambiente}
            onChangeText={setAmbiente}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.inputGrande]}
            placeholder="Descreva suas ideias e inspirações..."
            placeholderTextColor={C.cinza}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.botaoCriar}
            onPress={criarProjeto}
          >
            <Text style={styles.botaoCriarTexto}>
              +  Adicionar projeto
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listaTopo}>
          <View>
            <Text style={styles.listaTitulo}>Seus planejamentos</Text>
            <Text style={styles.listaDescricao}>
              Tudo o que você já começou a imaginar.
            </Text>
          </View>

          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>{projetos.length}</Text>
          </View>
        </View>

        {projetos.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🌱</Text>
            <Text style={styles.vazioTitulo}>
              Seu primeiro projeto começa aqui.
            </Text>
            <Text style={styles.vazioTexto}>
              Quando você adicionar um projeto, ele aparecerá
              nesta área.
            </Text>
          </View>
        ) : (
          projetos.map((item) => (
            <View key={item.id} style={styles.projetoCard}>
              <View style={styles.projetoIcone}>
                <Text style={{ fontSize: 25 }}>🏡</Text>
              </View>

              <View style={styles.projetoInfo}>
                <Text style={styles.projetoNome}>{item.nome}</Text>
                <Text style={styles.projetoAmbiente}>
                  {item.ambiente}
                </Text>

                {item.descricao ? (
                  <Text style={styles.projetoDescricao}>
                    {item.descricao}
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                onPress={() => excluirProjeto(item.id)}
                style={styles.excluir}
              >
                <Text style={styles.excluirTexto}>×</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.espacoFinal} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {tela === 'inicio' ? inicio() : projetosScreen()}
      </ScrollView>

      {navegacao()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.fundo,
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 17,
    paddingBottom: 23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerLegenda: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  logo: {
    color: C.verde,
    fontSize: 39,
    fontWeight: 'bold',
    letterSpacing: -2,
  },

  ponto: {
    color: C.marrom,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 24,
    backgroundColor: C.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D5DFCE',
  },

  avatarTexto: {
    color: C.verde,
    fontSize: 17,
    fontWeight: 'bold',
  },

  hero: {
    backgroundColor: C.verde,
    marginHorizontal: 19,
    padding: 25,
    minHeight: 320,
    borderRadius: 22,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  heroConteudo: {
    zIndex: 1,
  },

  heroEtiqueta: {
    color: '#D5DFCE',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 18,
  },

  heroTitulo: {
    color: C.branco,
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 41,
    maxWidth: 310,
  },

  heroDescricao: {
    color: '#E4E9DF',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 15,
    maxWidth: 300,
  },

  heroBotao: {
    backgroundColor: C.fundo,
    paddingVertical: 14,
    paddingHorizontal: 17,
    borderRadius: 9,
    alignSelf: 'flex-start',
    marginTop: 23,
  },

  heroBotaoTexto: {
    color: C.verde,
    fontSize: 12,
    fontWeight: 'bold',
  },

  heroFolha: {
    position: 'absolute',
    color: '#FFFFFF',
    opacity: 0.10,
    fontSize: 190,
    right: -12,
    bottom: 15,
  },

  heroNumero: {
    position: 'absolute',
    color: '#D5DFCE',
    opacity: 0.8,
    fontSize: 9,
    letterSpacing: 2,
    right: 23,
    bottom: 18,
  },

  resumo: {
    marginHorizontal: 22,
    marginTop: 23,
    paddingVertical: 19,
    paddingHorizontal: 20,
    backgroundColor: C.branco,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  resumoItem: {
    alignItems: 'center',
    flex: 1,
  },

  resumoNumero: {
    color: C.verde,
    fontSize: 25,
    fontWeight: 'bold',
  },

  resumoLegenda: {
    color: C.cinza,
    fontSize: 10,
    marginTop: 4,
  },

  resumoLinha: {
    width: 1,
    height: 37,
    backgroundColor: C.linha,
  },

  secao: {
    marginTop: 35,
    paddingHorizontal: 22,
  },

  secaoCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  secaoEtiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  secaoTitulo: {
    color: C.texto,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
  },

  secaoDecoracao: {
    color: C.sálvia,
    fontSize: 34,
  },

  acaoCard: {
    backgroundColor: C.branco,
    padding: 14,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    borderWidth: 1,
    borderColor: C.linha,
  },

  acaoIcone: {
    width: 53,
    height: 53,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  acaoEmoji: {
    fontSize: 25,
  },

  acaoInfo: {
    flex: 1,
    marginLeft: 14,
  },

  acaoTitulo: {
    color: C.verde,
    fontSize: 15,
    fontWeight: 'bold',
  },

  acaoDescricao: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 5,
  },

  acaoSeta: {
    color: C.marrom,
    fontSize: 20,
    paddingHorizontal: 5,
  },

  dica: {
    marginHorizontal: 20,
    marginTop: 25,
    padding: 23,
    backgroundColor: C.areia,
    borderRadius: 18,
    overflow: 'hidden',
  },

  dicaEtiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  dicaTitulo: {
    color: C.verde,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 13,
  },

  dicaTexto: {
    color: C.texto,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 300,
  },

  dicaFolha: {
    fontSize: 35,
    marginTop: 13,
  },

  rodape: {
    alignItems: 'center',
    paddingTop: 37,
    paddingBottom: 35,
  },

  rodapeLogo: {
    color: C.verde,
    fontSize: 29,
    fontWeight: 'bold',
  },

  rodapeTexto: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 5,
  },

  rodapeFinal: {
    color: C.marrom,
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 14,
  },

  projetosTopo: {
    paddingHorizontal: 23,
    paddingTop: 10,
    paddingBottom: 25,
  },

  projetosTitulo: {
    color: C.verde,
    fontSize: 33,
    fontWeight: 'bold',
    marginTop: 9,
  },

  projetosDescricao: {
    color: C.cinza,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 330,
  },

  formulario: {
    backgroundColor: C.branco,
    marginHorizontal: 19,
    padding: 21,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: C.linha,
  },

  formEtiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  formTitulo: {
    color: C.verde,
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },

  formDescricao: {
    color: C.cinza,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
    marginBottom: 13,
  },

  label: {
    color: C.texto,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: C.fundo,
    borderWidth: 1,
    borderColor: C.linha,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 13,
    color: C.texto,
    fontSize: 13,
  },

  inputGrande: {
    minHeight: 100,
  },

  botaoCriar: {
    backgroundColor: C.verde,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
  },

  botaoCriarTexto: {
    color: C.branco,
    fontSize: 13,
    fontWeight: 'bold',
  },

  listaTopo: {
    marginHorizontal: 22,
    marginTop: 32,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listaTitulo: {
    color: C.texto,
    fontSize: 19,
    fontWeight: 'bold',
  },

  listaDescricao: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 5,
  },

  contador: {
    backgroundColor: C.verdeClaro,
    minWidth: 34,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  contadorTexto: {
    color: C.verde,
    fontWeight: 'bold',
  },

  vazio: {
    backgroundColor: C.areia,
    marginHorizontal: 20,
    padding: 27,
    borderRadius: 16,
    alignItems: 'center',
  },

  vazioEmoji: {
    fontSize: 35,
    marginBottom: 12,
  },

  vazioTitulo: {
    color: C.verde,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  vazioTexto: {
    color: C.cinza,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },

  projetoCard: {
    backgroundColor: C.branco,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: C.linha,
  },

  projetoIcone: {
    width: 47,
    height: 47,
    backgroundColor: C.verdeClaro,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projetoInfo: {
    flex: 1,
    marginLeft: 12,
  },

  projetoNome: {
    color: C.verde,
    fontSize: 15,
    fontWeight: 'bold',
  },

  projetoAmbiente: {
    color: C.marrom,
    fontSize: 11,
    marginTop: 5,
  },

  projetoDescricao: {
    color: C.cinza,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },

  excluir: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#F5E9E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  excluirTexto: {
    color: '#A45C4E',
    fontSize: 21,
    lineHeight: 24,
  },

  espacoFinal: {
    height: 30,
  },

  nav: {
    height: 65,
    backgroundColor: C.branco,
    borderTopWidth: 1,
    borderTopColor: C.linha,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },

  navIcon: {
    color: C.cinza,
    fontSize: 22,
  },

  navTexto: {
    color: C.cinza,
    fontSize: 10,
    marginTop: 2,
  },

  navAtivo: {
    color: C.verde,
    fontWeight: 'bold',
  },
});