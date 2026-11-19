
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';

import { salvarProjetos, carregarProjetos } from './storage';

const colors = {
  background: '#F5F1E8',
  forest: '#405B46',
  sage: '#829477',
  lightGreen: '#C8D2BD',
  brown: '#8A674B',
  sand: '#C5A98B',
  cream: '#FFFFFF',
  text: '#33302D',
  muted: '#827D70',
};

const categories = [
  {
    icon: '🏡',
    title: 'Projetos',
    description: 'Planeje seus ambientes',
    background: '#E4E9DE',
  },
  {
    icon: '🌿',
    title: 'Plantas',
    description: 'Descubra o mundo verde',
    background: '#DCE5D5',
  },
  {
    icon: '🪴',
    title: 'Inspirações',
    description: 'Encontre novas ideias',
    background: '#EEE3D5',
  },
  {
    icon: '♡',
    title: 'Favoritos',
    description: 'Suas referências salvas',
    background: '#E9E1D7',
  },
];

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [projetos, setProjetos] = useState([]);
  const [nome, setNome] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    async function carregarDados() {
      const dados = await carregarProjetos();
      setProjetos(dados);
    }

    carregarDados();
  }, []);

  async function adicionarProjeto() {
    if (!nome.trim() || !ambiente.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Informe o nome do projeto e o ambiente.'
      );
      return;
    }

    const novoProjeto = {
      id: Date.now().toString(),
      nome: nome.trim(),
      ambiente: ambiente.trim(),
      descricao: descricao.trim(),
    };

    const listaAtualizada = [...projetos, novoProjeto];

    setProjetos(listaAtualizada);
    await salvarProjetos(listaAtualizada);

    setNome('');
    setAmbiente('');
    setDescricao('');

    Alert.alert('Projeto criado!', 'Seu projeto foi salvo no Lotus.');
  }

  function abrirCategoria(titulo) {
    if (titulo === 'Projetos') {
      setTela('projetos');
    } else {
      Alert.alert('Em breve!', 'Essa área estará disponível em breve.');
    }
  }

  function inicio() {
    return (
      <>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>
              PAISAGISMO & DESIGN DE INTERIORES
            </Text>
            <Text style={styles.logo}>lotus.</Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>N</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTag}>SEU ESPAÇO, SUA ESSÊNCIA</Text>

          <Text style={styles.heroTitle}>
            Cultive beleza em cada cantinho.
          </Text>

          <Text style={styles.heroDescription}>
            Descubra possibilidades, organize suas ideias e transforme
            ambientes em lugares especiais.
          </Text>

          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => setTela('projetos')}
          >
            <Text style={styles.heroButtonText}>Começar agora →</Text>
          </TouchableOpacity>

          <Text style={styles.heroDecoration}>✳</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Explore o Lotus</Text>
              <Text style={styles.sectionSubtitle}>
                Tudo começa com uma ideia.
              </Text>
            </View>
            <Text style={styles.leaf}>❧</Text>
          </View>

          <View style={styles.grid}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryCard,
                  { backgroundColor: item.background },
                ]}
                onPress={() => abrirCategoria(item.title)}
              >
                <Text style={styles.categoryIcon}>{item.icon}</Text>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text style={styles.categoryDescription}>
                  {item.description}
                </Text>
                <Text style={styles.cardArrow}>↗</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inspiration}>
          <Text style={styles.inspirationLabel}>
            UM TOQUE DE INSPIRAÇÃO
          </Text>

          <Text style={styles.inspirationTitle}>
            A natureza também faz parte da decoração.
          </Text>

          <Text style={styles.inspirationDescription}>
            Pequenos detalhes podem transformar completamente um ambiente.
            Aposte em plantas, texturas naturais e iluminação aconchegante.
          </Text>

          <Text style={styles.inspirationIcon}>🌱</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>lotus.</Text>
          <Text style={styles.footerText}>
            Cultive ideias. Transforme espaços.
          </Text>
          <Text style={styles.footerCopyright}>
            FEITO PARA FLORESCER ♡
          </Text>
        </View>
      </>
    );
  }

  function telaProjetos() {
    return (
      <View style={styles.projectsContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setTela('inicio')}
        >
          <Text style={styles.backButtonText}>← Voltar ao início</Text>
        </TouchableOpacity>

        <Text style={styles.projectsEyebrow}>SEU ESPAÇO, SEU PLANEJAMENTO</Text>
        <Text style={styles.projectsTitle}>Meus projetos</Text>
        <Text style={styles.projectsSubtitle}>
          Organize suas ideias e transforme seus ambientes.
        </Text>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Novo projeto</Text>

          <Text style={styles.inputLabel}>Nome do projeto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Minha sala dos sonhos"
            placeholderTextColor={colors.muted}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.inputLabel}>Tipo de ambiente *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Sala, quarto, jardim..."
            placeholderTextColor={colors.muted}
            value={ambiente}
            onChangeText={setAmbiente}
          />

          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Conte um pouco sobre sua ideia..."
            placeholderTextColor={colors.muted}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={adicionarProjeto}
          >
            <Text style={styles.saveButtonText}>+ Criar projeto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.projectListHeader}>
          <Text style={styles.projectListTitle}>Projetos cadastrados</Text>
          <Text style={styles.projectCount}>{projetos.length}</Text>
        </View>

        {projetos.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>🌱</Text>
            <Text style={styles.emptyTitle}>
              Seu espaço começa com uma ideia.
            </Text>
            <Text style={styles.emptyText}>
              Você ainda não tem projetos. Crie o primeiro e ele aparecerá
              aqui!
            </Text>
          </View>
        ) : (
          projetos.map((item) => (
            <View key={item.id} style={styles.projectCard}>
              <Text style={styles.projectIcon}>🏡</Text>
              <View style={styles.projectInfo}>
                <Text style={styles.projectName}>{item.nome}</Text>
                <Text style={styles.projectEnvironment}>
                  {item.ambiente}
                </Text>
                {item.descricao ? (
                  <Text style={styles.projectDescription}>
                    {item.descricao}
                  </Text>
                ) : null}
              </View>
            </View>
          ))
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {tela === 'inicio' ? inicio() : telaProjetos()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 25,
    paddingTop: 22,
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: colors.brown,
  },

  logo: {
    fontSize: 39,
    fontWeight: 'bold',
    color: colors.forest,
    letterSpacing: -2,
  },

  profile: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: colors.forest,
    fontSize: 17,
    fontWeight: 'bold',
  },

  hero: {
    backgroundColor: colors.forest,
    marginHorizontal: 20,
    padding: 27,
    borderRadius: 22,
    overflow: 'hidden',
  },

  heroTag: {
    color: colors.lightGreen,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 17,
  },

  heroTitle: {
    color: colors.cream,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 37,
    maxWidth: 310,
  },

  heroDescription: {
    color: '#E1E7DC',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 13,
    maxWidth: 320,
  },

  heroButton: {
    backgroundColor: colors.background,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 9,
    alignSelf: 'flex-start',
    marginTop: 23,
  },

  heroButtonText: {
    color: colors.forest,
    fontSize: 12,
    fontWeight: 'bold',
  },

  heroDecoration: {
    position: 'absolute',
    color: '#FFFFFF',
    opacity: 0.10,
    fontSize: 150,
    right: 5,
    bottom: -48,
  },

  section: {
    paddingHorizontal: 22,
    marginTop: 36,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 23,
    color: colors.text,
    fontWeight: 'bold',
  },

  sectionSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 5,
  },

  leaf: {
    fontSize: 32,
    color: colors.sage,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryCard: {
    width: '48%',
    minHeight: 155,
    padding: 17,
    borderRadius: 16,
    marginBottom: 13,
    justifyContent: 'center',
  },

  categoryIcon: {
    fontSize: 27,
    marginBottom: 13,
  },

  categoryTitle: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: 'bold',
  },

  categoryDescription: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 5,
  },

  cardArrow: {
    position: 'absolute',
    right: 15,
    top: 14,
    color: colors.brown,
    fontSize: 17,
  },

  inspiration: {
    backgroundColor: '#E8E0D3',
    marginHorizontal: 20,
    marginTop: 22,
    padding: 23,
    borderRadius: 18,
    overflow: 'hidden',
  },

  inspirationLabel: {
    color: colors.brown,
    fontSize: 9,
    letterSpacing: 2,
  },

  inspirationTitle: {
    color: colors.forest,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 29,
    marginTop: 13,
    maxWidth: 290,
  },

  inspirationDescription: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
    maxWidth: 300,
  },

  inspirationIcon: {
    fontSize: 45,
    marginTop: 15,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 38,
    paddingBottom: 30,
  },

  footerLogo: {
    color: colors.forest,
    fontSize: 28,
    fontWeight: 'bold',
  },

  footerText: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 5,
  },

  footerCopyright: {
    color: colors.brown,
    fontSize: 8,
    letterSpacing: 2,
    marginTop: 15,
  },

  projectsContainer: {
    padding: 22,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    marginBottom: 25,
  },

  backButtonText: {
    color: colors.forest,
    fontSize: 14,
    fontWeight: 'bold',
  },

  projectsEyebrow: {
    color: colors.brown,
    fontSize: 9,
    letterSpacing: 2,
  },

  projectsTitle: {
    color: colors.forest,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },

  projectsSubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    marginBottom: 25,
  },

  formCard: {
    backgroundColor: '#E4E9DE',
    padding: 20,
    borderRadius: 18,
  },

  formTitle: {
    color: colors.forest,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
  },

  inputLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: colors.cream,
    borderRadius: 10,
    padding: 13,
    fontSize: 13,
    color: colors.text,
    borderWidth: 1,
    borderColor: '#D5DDCE',
  },

  descriptionInput: {
    minHeight: 95,
  },

  saveButton: {
    backgroundColor: colors.forest,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 22,
  },

  saveButtonText: {
    color: colors.cream,
    fontSize: 14,
    fontWeight: 'bold',
  },

  projectListHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 15,
  },

  projectListTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },

  projectCount: {
    color: colors.forest,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    fontWeight: 'bold',
  },

  emptyCard: {
    backgroundColor: '#EEE8DC',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 35,
    marginBottom: 12,
  },

  emptyTitle: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  emptyText: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 8,
  },

  projectCard: {
    backgroundColor: colors.cream,
    borderRadius: 14,
    padding: 17,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
  },

  projectIcon: {
    fontSize: 27,
  },

  projectInfo: {
    flex: 1,
  },

  projectName: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: 'bold',
  },

  projectEnvironment: {
    color: colors.brown,
    fontSize: 12,
    marginTop: 5,
  },

  projectDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
});