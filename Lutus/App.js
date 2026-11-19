
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>SEJA BEM-VINDA AO</Text>
            <Text style={styles.logo}>lotus.</Text>
          </View>

          <View style={styles.profile}>
            <Text style={styles.profileText}>N</Text>
          </View>
        </View>

        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            Seu espaço, sua essência.
          </Text>
          <Text style={styles.welcomeText}>
            Transforme suas ideias em ambientes cheios de vida.
          </Text>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>
              Explorar projetos →
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore o Lotus</Text>
          <Text style={styles.sectionSubtitle}>
            Tudo para transformar seus ambientes.
          </Text>

          <View style={styles.grid}>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🏡</Text>
              <Text style={styles.optionTitle}>Projetos</Text>
              <Text style={styles.optionText}>Organize suas ideias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🌿</Text>
              <Text style={styles.optionTitle}>Plantas</Text>
              <Text style={styles.optionText}>Descubra o verde</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>🪴</Text>
              <Text style={styles.optionTitle}>Inspirações</Text>
              <Text style={styles.optionText}>Encontre referências</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionIcon}>♡</Text>
              <Text style={styles.optionTitle}>Favoritos</Text>
              <Text style={styles.optionText}>Seus itens salvos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>lotus.</Text>
          <Text style={styles.footerText}>
            Cultive ideias. Transforme espaços.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7F2',
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#987A7C',
  },
  logo: {
    fontSize: 38,
    color: '#78394A',
    fontWeight: 'bold',
  },
  profile: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: '#EBD9D7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    color: '#78394A',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcome: {
    backgroundColor: '#78394A',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 25,
    borderRadius: 20,
  },
  welcomeTitle: {
    color: '#FFF9F5',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  welcomeText: {
    color: '#F1DFDF',
    fontSize: 14,
    lineHeight: 22,
  },
  mainButton: {
    backgroundColor: '#FBF2EC',
    padding: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 25,
  },
  mainButtonText: {
    color: '#78394A',
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 22,
    marginTop: 35,
  },
  sectionTitle: {
    fontSize: 23,
    color: '#542635',
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#987A7C',
    fontSize: 13,
    marginTop: 6,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 18,
    borderRadius: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F0E5E0',
  },
  optionIcon: {
    fontSize: 27,
    marginBottom: 14,
  },
  optionTitle: {
    color: '#542635',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionText: {
    color: '#987A7C',
    fontSize: 11,
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    padding: 35,
  },
  footerLogo: {
    fontSize: 25,
    color: '#78394A',
    fontWeight: 'bold',
  },
  footerText: {
    color: '#987A7C',
    fontSize: 11,
    marginTop: 5,
  },
});