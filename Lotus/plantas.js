
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

const C = {
  fundo: '#F5F3EC',
  branco: '#FFFFFF',
  verde: '#405B46',
  verdeEscuro: '#304735',
  salvia: '#84977D',
  verdeClaro: '#E5EBDD',
  areia: '#EDE5D8',
  marrom: '#98765A',
  texto: '#33382F',
  cinza: '#85877E',
  linha: '#E6E4DA',
};

const plantasIniciais = [
  {
    id: '1',
    nome: 'Costela-de-adão',
    categoria: 'Internas',
    luz: 'Luz indireta',
    agua: '1 a 2 vezes por semana',
    imagem: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600',
  },
  {
    id: '2',
    nome: 'Jiboia',
    categoria: 'Fáceis de cuidar',
    luz: 'Meia-sombra',
    agua: 'Quando o solo estiver seco',
    imagem: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b47?w=600',
  },
  {
    id: '3',
    nome: 'Espada-de-são-jorge',
    categoria: 'Fáceis de cuidar',
    luz: 'Sol ou meia-sombra',
    agua: 'Pouca água',
    imagem: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b3d?w=600',
  },
  {
    id: '4',
    nome: 'Lírio-da-paz',
    categoria: 'Internas',
    luz: 'Luz indireta',
    agua: 'Manter o solo úmido',
    imagem: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=600',
  },
];

export default function PlantasScreen({ onVoltar }) {
  const [plantas, setPlantas] = useState(plantasIniciais);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('Internas');
  const [luz, setLuz] = useState('');
  const [agua, setAgua] = useState('');

  const categorias = [
    'Todas',
    'Internas',
    'Externas',
    'Fáceis de cuidar',
  ];

  const plantasFiltradas = plantas.filter((planta) => {
    const correspondeNome = planta.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeCategoria =
      categoriaAtiva === 'Todas' ||
      planta.categoria === categoriaAtiva;

    return correspondeNome && correspondeCategoria;
  });

  function adicionarPlanta() {
    if (!nome.trim() || !luz.trim() || !agua.trim()) {
      Alert.alert(
        'Faltam informações',
        'Preencha o nome, a iluminação e os cuidados com a água.'
      );
      return;
    }

    const novaPlanta = {
      id: Date.now().toString(),
      nome: nome.trim(),
      categoria,
      luz: luz.trim(),
      agua: agua.trim(),
      imagem: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600',
    };

    setPlantas((lista) => [...lista, novaPlanta]);

    setNome('');
    setLuz('');
    setAgua('');

    Alert.alert(
      'Planta adicionada!',
      'Sua nova planta foi incluída no catálogo.'
    );
  }

  function excluirPlanta(id) {
    Alert.alert(
      'Excluir planta',
      'Deseja realmente remover esta planta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setPlantas((lista) =>
              lista.filter((planta) => planta.id !== id)
            );
          },
        },
      ]
    );
  }

  function campoCategoria(item) {
    return (
      <TouchableOpacity
        key={item}
        style={[
          styles.filtro,
          categoriaAtiva === item && styles.filtroAtivo,
        ]}
        onPress={() => setCategoriaAtiva(item)}
      >
        <Text
          style={[
            styles.filtroTexto,
            categoriaAtiva === item && styles.filtroTextoAtivo,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* CABEÇALHO */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerLegenda}>
            PAISAGISMO & DESIGN DE INTERIORES
          </Text>

          <Text style={styles.logo}>
            lotus<Text style={styles.ponto}>.</Text>
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>L</Text>
        </View>
      </View>

      <View style={styles.conteudo}>

        <TouchableOpacity
          style={styles.voltar}
          onPress={onVoltar}
        >
          <Text style={styles.voltarTexto}>
            ← Voltar ao início
          </Text>
        </TouchableOpacity>

        {/* TÍTULO */}

        <Text style={styles.etiqueta}>
          DESCUBRA O MUNDO VERDE
        </Text>

        <Text style={styles.titulo}>
          Universo das plantas
        </Text>

        <Text style={styles.descricao}>
          Conheça espécies, descubra cuidados e encontre
          a planta ideal para transformar seu espaço.
        </Text>

        {/* DESTAQUE */}

        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🌿</Text>

          <Text style={styles.heroTitulo}>
            Um novo jeito de cultivar vida.
          </Text>

          <Text style={styles.heroDescricao}>
            Pequenos detalhes verdes podem transformar
            qualquer ambiente em um lugar especial.
          </Text>

          <Text style={styles.heroNumero}>01 / 04</Text>
        </View>

        {/* PESQUISA */}

        <Text style={styles.secaoTitulo}>
          Encontre sua planta
        </Text>

        <TextInput
          style={styles.pesquisa}
          placeholder="⌕  Buscar plantas..."
          placeholderTextColor={C.cinza}
          value={busca}
          onChangeText={setBusca}
        />

        {/* CATEGORIAS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categorias}
        >
          {categorias.map(campoCategoria)}
        </ScrollView>

        {/* CATÁLOGO */}

        <View style={styles.listaTopo}>
          <View>
            <Text style={styles.secaoTitulo}>
              Espécies em destaque
            </Text>

            <Text style={styles.listaDescricao}>
              Encontre sua próxima companheira verde.
            </Text>
          </View>

          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>
              {plantasFiltradas.length}
            </Text>
          </View>
        </View>

        <View style={styles.grade}>
          {plantasFiltradas.map((planta) => (
            <View key={planta.id} style={styles.cardPlanta}>

              <Image
                source={{ uri: planta.imagem }}
                style={styles.imagemPlanta}
                resizeMode="cover"
              />

              <View style={styles.cardConteudo}>
                <Text style={styles.plantaCategoria}>
                  {planta.categoria.toUpperCase()}
                </Text>

                <Text style={styles.plantaNome}>
                  {planta.nome}
                </Text>

                <Text style={styles.cuidado}>
                  ☀ {planta.luz}
                </Text>

                <Text style={styles.cuidado}>
                  💧 {planta.agua}
                </Text>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => excluirPlanta(planta.id)}
                >
                  <Text style={styles.botaoExcluirTexto}>
                    Remover planta ×
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {plantasFiltradas.length === 0 && (
          <View style={styles.vazio}>
            <Text style={styles.vazioEmoji}>🍃</Text>
            <Text style={styles.vazioTitulo}>
              Nenhuma planta encontrada.
            </Text>
            <Text style={styles.vazioDescricao}>
              Tente pesquisar por outro nome ou categoria.
            </Text>
          </View>
        )}

        {/* CADASTRO */}

        <View style={styles.formulario}>
          <Text style={styles.formEtiqueta}>
            SUA COLEÇÃO VERDE
          </Text>

          <Text style={styles.formTitulo}>
            Adicione uma nova planta
          </Text>

          <Text style={styles.formDescricao}>
            Cadastre novas espécies e organize seu próprio
            catálogo de plantas.
          </Text>

          <Text style={styles.label}>
            Nome da planta *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Samambaia"
            placeholderTextColor={C.cinza}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Categoria
          </Text>

          <View style={styles.opcoes}>
            {categorias.slice(1).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.opcao,
                  categoria === item && styles.opcaoAtiva,
                ]}
                onPress={() => setCategoria(item)}
              >
                <Text
                  style={[
                    styles.opcaoTexto,
                    categoria === item && styles.opcaoTextoAtivo,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>
            Iluminação *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Luz indireta"
            placeholderTextColor={C.cinza}
            value={luz}
            onChangeText={setLuz}
          />

          <Text style={styles.label}>
            Cuidados com a água *
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Regar duas vezes por semana"
            placeholderTextColor={C.cinza}
            value={agua}
            onChangeText={setAgua}
          />

          <TouchableOpacity
            style={styles.botaoCriar}
            onPress={adicionarPlanta}
          >
            <Text style={styles.botaoCriarTexto}>
              + Adicionar planta
            </Text>
          </TouchableOpacity>
        </View>

        {/* RODAPÉ */}

        <View style={styles.rodape}>
          <Text style={styles.rodapeLogo}>lotus.</Text>

          <Text style={styles.rodapeTexto}>
            Cultive ideias. Transforme espaços.
          </Text>

          <Text style={styles.rodapeFinal}>
            FEITO PARA FLORESCER ♡
          </Text>
        </View>

      </View>
    </ScrollView>
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
  },

  avatarTexto: {
    color: C.verde,
    fontSize: 17,
    fontWeight: 'bold',
  },

  conteudo: {
    paddingHorizontal: 22,
    paddingBottom: 35,
  },

  voltar: {
    marginBottom: 22,
  },

  voltarTexto: {
    color: C.verde,
    fontSize: 13,
    fontWeight: 'bold',
  },

  etiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  titulo: {
    color: C.verde,
    fontSize: 31,
    fontWeight: 'bold',
    marginTop: 9,
  },

  descricao: {
    color: C.cinza,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 9,
    marginBottom: 22,
  },

  hero: {
    backgroundColor: C.verde,
    padding: 23,
    borderRadius: 19,
    minHeight: 190,
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },

  heroEmoji: {
    fontSize: 30,
    marginBottom: 12,
  },

  heroTitulo: {
    color: C.branco,
    fontSize: 23,
    fontWeight: 'bold',
    maxWidth: 260,
  },

  heroDescricao: {
    color: '#E4E9DF',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
    maxWidth: 280,
  },

  heroNumero: {
    color: '#D5DFCE',
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 15,
    alignSelf: 'flex-end',
  },

  secaoTitulo: {
    color: C.texto,
    fontSize: 19,
    fontWeight: 'bold',
  },

  pesquisa: {
    backgroundColor: C.branco,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: C.linha,
    padding: 14,
    marginTop: 14,
    color: C.texto,
    fontSize: 13,
  },

  categorias: {
    marginTop: 16,
    marginBottom: 27,
  },

  filtro: {
    backgroundColor: C.verdeClaro,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },

  filtroAtivo: {
    backgroundColor: C.verde,
  },

  filtroTexto: {
    color: C.verde,
    fontSize: 11,
    fontWeight: '600',
  },

  filtroTextoAtivo: {
    color: C.branco,
  },

  listaTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  listaDescricao: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 5,
  },

  contador: {
    backgroundColor: C.verdeClaro,
    width: 34,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contadorTexto: {
    color: C.verde,
    fontWeight: 'bold',
  },

  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  cardPlanta: {
    width: '48%',
    backgroundColor: C.branco,
    borderRadius: 15,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.linha,
  },

  imagemPlanta: {
    width: '100%',
    height: 125,
    backgroundColor: C.verdeClaro,
  },

  cardConteudo: {
    padding: 11,
  },

  plantaCategoria: {
    color: C.marrom,
    fontSize: 8,
    letterSpacing: 1,
  },

  plantaNome: {
    color: C.verde,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 8,
  },

  cuidado: {
    color: C.cinza,
    fontSize: 9,
    marginTop: 5,
  },

  botaoExcluir: {
    borderTopWidth: 1,
    borderTopColor: C.linha,
    marginTop: 12,
    paddingTop: 9,
  },

  botaoExcluirTexto: {
    color: '#A45C4E',
    fontSize: 10,
    fontWeight: '600',
  },

  vazio: {
    backgroundColor: C.areia,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },

  vazioEmoji: {
    fontSize: 32,
  },

  vazioTitulo: {
    color: C.verde,
    fontWeight: 'bold',
    marginTop: 10,
  },

  vazioDescricao: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },

  formulario: {
    backgroundColor: C.verdeClaro,
    padding: 19,
    borderRadius: 18,
    marginTop: 25,
  },

  formEtiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  formTitulo: {
    color: C.verde,
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 9,
  },

  formDescricao: {
    color: C.cinza,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },

  label: {
    color: C.texto,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 17,
    marginBottom: 8,
  },

  input: {
    backgroundColor: C.branco,
    borderWidth: 1,
    borderColor: C.linha,
    borderRadius: 10,
    padding: 13,
    color: C.texto,
    fontSize: 13,
  },

  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  opcao: {
    backgroundColor: C.branco,
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 11,
  },

  opcaoAtiva: {
    backgroundColor: C.verde,
  },

  opcaoTexto: {
    color: C.verde,
    fontSize: 10,
  },

  opcaoTextoAtivo: {
    color: C.branco,
    fontWeight: 'bold',
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

  rodape: {
    alignItems: 'center',
    paddingTop: 37,
    paddingBottom: 20,
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
});
