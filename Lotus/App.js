
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>PAISAGISMO & DESIGN DE INTERIORES</Text>
            <Text style={styles.logo}>lotus.</Text>
          </View>

          <TouchableOpacity style={styles.profile}>
            <Text style={styles.profileText}>N</Text>
          </TouchableOpacity>
        </View>

        {/* Apresentação */}
        <View style={styles.hero}>
          <Text style={styles.heroTag}>SEU ESPAÇO, SUA ESSÊNCIA</Text>

          <Text style={styles.heroTitle}>
            Cultive beleza em cada cantinho.
          </Text>

          <Text style={styles.heroDescription}>
            Descubra possibilidades, organize suas ideias e transforme
            ambientes em lugares especiais.
          </Text>

          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>
              Começar agora →
            </Text>
          </TouchableOpacity>

          <Text style={styles.heroDecoration}>✳</Text>
        </View>

        {/* Categorias */}
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
                  { backgroundColor: item.background }
                ]}
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

        {/* Inspiração */}
        <View style={styles.inspiration}>
          <Text style={styles.inspirationLabel}>UM TOQUE DE INSPIRAÇÃO</Text>

          <Text style={styles.inspirationTitle}>
            A natureza também faz parte da decoração.
          </Text>

          <Text style={styles.inspirationDescription}>
            Pequenos detalhes podem transformar completamente um ambiente.
            Aposte em plantas, texturas naturais e iluminação aconchegante.
          </Text>

          <Text style={styles.inspirationIcon}>🌱</Text>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>lotus.</Text>
          <Text style={styles.footerText}>
            Cultive ideias. Transforme espaços.
          </Text>
          <Text style={styles.footerCopyright}>
            FEITO PARA FLORESCER ♡
          </Text>
        </View>

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
});