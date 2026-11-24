
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
  salvia: '#84977D',
  verdeClaro: '#E5EBDD',
  areia: '#EDE5D8',
  marrom: '#98765A',
  texto: '#33382F',
  cinza: '#85877E',
  linha: '#E6E4DA',
};

const inspiracoes = [
  {
    titulo: 'Natural e acolhedor',
    categoria: 'Interiores',
    descricao: 'Madeira, fibras naturais e tons terrosos.',
    simbolo: '01',
  },
  {
    titulo: 'Jardins pequenos',
    categoria: 'Paisagismo',
    descricao: 'Ideias para aproveitar cada cantinho.',
    simbolo: '02',
  },
  {
    titulo: 'Minimalismo orgânico',
    categoria: 'Interiores',
    descricao: 'Formas simples e materiais naturais.',
    simbolo: '03',
  },
  {
    titulo: 'Verde dentro de casa',
    categoria: 'Plantas',
    descricao: 'Como trazer a natureza para perto.',
    simbolo: '04',
  },
];

const plantas = [
  {
    nome: 'Jiboia',
    nomeCientifico: 'Epipremnum aureum',
    ambiente: 'Interior',
    luz: 'Luz indireta',
    rega: 'Quando o substrato começar a secar.',
    simbolo: '🌿',
  },
  {
    nome: 'Espada-de-são-jorge',
    nomeCientifico: 'Dracaena trifasciata',
    ambiente: 'Interior e exterior',
    luz: 'Luz indireta ou meia-sombra',
    rega: 'Moderada, evitando encharcamento.',
    simbolo: '🌱',
  },
  {
    nome: 'Costela-de-adão',
    nomeCientifico: 'Monstera deliciosa',
    ambiente: 'Interior',
    luz: 'Luz indireta abundante',
    rega: 'Quando a camada superficial secar.',
    simbolo: '🍃',
  },
  {
    nome: 'Lírio-da-paz',
    nomeCientifico: 'Spathiphyllum wallisii',
    ambiente: 'Interior',
    luz: 'Luz indireta',
    rega: 'Manter o substrato levemente úmido.',
    simbolo: '🌼',
  },
];

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [projetos, setProjetos] = useState([]);
  const [nome, setNome] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [descricao, setDescricao] = useState('');
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [plantaSelecionada, setPlantaSelecionada] = useState(null);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await carregarProjetos();
        setProjetos(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.error('Erro ao carregar projetos:', erro);
      }
    }

    carregar();
  }, []);

  async function atualizarProjetos(lista) {
    setProjetos(lista);

    try {
      await salvarProjetos(lista);
    } catch (erro) {
      console.error('Erro ao salvar projetos:', erro);
    }
  }

  async function criarProjeto() {
    if (!nome.trim() || !ambiente.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Informe o nome do projeto e o tipo de ambiente.'
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

    Alert.alert('Projeto criado', 'Seu planejamento foi salvo.');
  }

  function excluirProjeto(id) {
    Alert.alert(
      'Excluir projeto',
      'Deseja realmente excluir este planejamento?',
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
            setProjetoSelecionado(null);
          },
        },
      ]
    );
  }

  function navegar(destino) {
    setTela(destino);
    setPlantaSelecionada(null);
    setProjetoSelecionado(null);
  }

  function Cabecalho({ legenda = 'PAISAGISMO & DESIGN DE INTERIORES' }) {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLegenda}>{legenda}</Text>
          <Text style={styles.logo}>
            lotus<Text style={styles.ponto}>.</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navegar('perfil')}
        >
          <Text style={styles.avatarTexto}>L</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function TituloSecao({ etiqueta, titulo, descricao }) {
    return (
      <View style={styles.tituloSecao}>
        {etiqueta ? (
          <Text style={styles.etiqueta}>{etiqueta}</Text>
        ) : null}
        <Text style={styles.tituloGrande}>{titulo}</Text>
        {descricao ? (
          <Text style={styles.descricaoTopo}>{descricao}</Text>
        ) : null}
      </View>
    );
  }

  function Inicio() {
    return (
      <>
        <Cabecalho />

        <View style={styles.hero}>
          <Text style={styles.heroEtiqueta}>ESPAÇOS COM IDENTIDADE</Text>
          <Text style={styles.heroTitulo}>
            Um lugar para suas ideias ganharem forma.
          </Text>
          <Text style={styles.heroDescricao}>
            Planeje ambientes, descubra referências e encontre
            novas maneiras de aproximar a natureza do seu espaço.
          </Text>

          <TouchableOpacity
            style={styles.heroBotao}
            onPress={() => navegar('projetos')}
          >
            <Text style={styles.heroBotaoTexto}>
              Meus projetos  →
            </Text>
          </TouchableOpacity>

          <Text style={styles.heroDecoracao}>lotus.</Text>
        </View>

        <View style={styles.resumo}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>
              {String(projetos.length).padStart(2, '0')}
            </Text>
            <Text style={styles.resumoLegenda}>Projetos salvos</Text>
          </View>

          <View style={styles.resumoLinha} />

          <View style={styles.resumoItem}>
            <Text style={styles.resumoNumero}>04</Text>
            <Text style={styles.resumoLegenda}>Espécies no catálogo</Text>
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.etiqueta}>EXPLORE O APLICATIVO</Text>
          <Text style={styles.tituloSecaoTexto}>O que você procura?</Text>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navegar('projetos')}
          >
            <Text style={styles.menuNumero}>01</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitulo}>Projetos</Text>
              <Text style={styles.menuDescricao}>
                Organize suas ideias e planejamentos.
              </Text>
            </View>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navegar('inspiracoes')}
          >
            <Text style={styles.menuNumero}>02</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitulo}>Inspirações</Text>
              <Text style={styles.menuDescricao}>
                Referências para seus próximos ambientes.
              </Text>
            </View>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuCard}
            onPress={() => navegar('plantas')}
          >
            <Text style={styles.menuNumero}>03</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitulo}>Plantas</Text>
              <Text style={styles.menuDescricao}>
                Conheça espécies e seus cuidados.
              </Text>
            </View>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dica}>
          <Text style={styles.etiqueta}>NOTA DE PAISAGISMO</Text>
          <Text style={styles.dicaTitulo}>
            Observe a luz antes de escolher suas plantas.
          </Text>
          <Text style={styles.dicaTexto}>
            A iluminação disponível no ambiente influencia
            diretamente no desenvolvimento de cada espécie.
            Antes de escolher, observe como a luz entra no espaço.
          </Text>
        </View>

        <Rodape />
      </>
    );
  }

  function Projetos() {
    return (
      <>
        <Cabecalho />

        <TituloSecao
          etiqueta="SEU ESPAÇO, SUAS IDEIAS"
          titulo="Projetos"
          descricao="Seus planejamentos reunidos em um só lugar."
        />

        <View style={styles.formulario}>
          <Text style={styles.formEtiqueta}>NOVO PLANEJAMENTO</Text>
          <Text style={styles.formTitulo}>Adicionar projeto</Text>

          <Text style={styles.label}>Nome do projeto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: Jardim da varanda"
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
            placeholder="Anote suas ideias para esse espaço..."
            placeholderTextColor={C.cinza}
            value={descricao}
            onChangeText={setDescricao}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.botaoPrincipal}
            onPress={criarProjeto}
          >
            <Text style={styles.botaoPrincipalTexto}>
              + Salvar planejamento
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listaTopo}>
          <View>
            <Text style={styles.listaTitulo}>Seus planejamentos</Text>
            <Text style={styles.listaDescricao}>
              {projetos.length} projeto(s) salvo(s)
            </Text>
          </View>
        </View>

        {projetos.length === 0 ? (
          <View style={styles.vazio}>
            <Text style={styles.vazioTitulo}>
              Ainda não há projetos por aqui.
            </Text>
            <Text style={styles.vazioTexto}>
              Use o formulário acima para registrar seu primeiro
              planejamento.
            </Text>
          </View>
        ) : (
          projetos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.projetoCard}
              onPress={() => setProjetoSelecionado(
                projetoSelecionado === item.id ? null : item.id
              )}
            >
              <View style={styles.projetoNumero}>
                <Text style={styles.projetoNumeroTexto}>✳</Text>
              </View>

              <View style={styles.projetoInfo}>
                <Text style={styles.projetoNome}>{item.nome}</Text>
                <Text style={styles.projetoAmbiente}>{item.ambiente}</Text>

                {projetoSelecionado === item.id ? (
                  <>
                    {item.descricao ? (
                      <Text style={styles.projetoDescricao}>
                        {item.descricao}
                      </Text>
                    ) : (
                      <Text style={styles.projetoDescricao}>
                        Nenhuma descrição adicionada.
                      </Text>
                    )}
                    <TouchableOpacity
                      style={styles.excluirBotao}
                      onPress={() => excluirProjeto(item.id)}
                    >
                      <Text style={styles.excluirTexto}>
                        Excluir projeto
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.verDetalhes}>
                    Toque para ver detalhes →
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))
        )}

        <View style={styles.espacoFinal} />
      </>
    );
  }

  function Inspiracoes() {
    const categorias = ['Todos', 'Interiores', 'Paisagismo', 'Plantas'];

    const filtradas = inspiracoes.filter((item) => {
      const correspondeCategoria =
        categoria === 'Todos' || item.categoria === categoria;

      const correspondeBusca =
        item.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        item.descricao.toLowerCase().includes(busca.toLowerCase());

      return correspondeCategoria && correspondeBusca;
    });

    return (
      <>
        <Cabecalho legenda="REFERÊNCIAS & IDEIAS" />

        <TituloSecao
          etiqueta="REPERTÓRIO VISUAL"
          titulo="Inspirações"
          descricao="Ideias para observar, adaptar e levar para seus projetos."
        />

        <View style={styles.buscaContainer}>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar referências..."
            placeholderTextColor={C.cinza}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categorias}
          contentContainerStyle={styles.categoriasConteudo}
        >
          {categorias.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoriaBotao,
                categoria === item && styles.categoriaAtiva,
              ]}
              onPress={() => setCategoria(item)}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoria === item && styles.categoriaTextoAtivo,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.secao}>
          {filtradas.length === 0 ? (
            <View style={styles.vazio}>
              <Text style={styles.vazioTitulo}>
                Nenhuma referência encontrada.
              </Text>
              <Text style={styles.vazioTexto}>
                Tente outro termo ou categoria.
              </Text>
            </View>
          ) : (
            filtradas.map((item) => (
              <View key={item.simbolo} style={styles.inspiracaoCard}>
                <View style={styles.inspiracaoFaixa}>
                  <Text style={styles.inspiracaoNumero}>
                    {item.simbolo}
                  </Text>
                  <Text style={styles.inspiracaoCategoria}>
                    {item.categoria.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.inspiracaoTitulo}>
                  {item.titulo}
                </Text>
                <Text style={styles.inspiracaoDescricao}>
                  {item.descricao}
                </Text>
              </View>
            ))
          )}
        </View>

        <Rodape />
      </>
    );
  }

  function Plantas() {
    const filtradas = plantas.filter((item) =>
      item.nome.toLowerCase().includes(busca.toLowerCase()) ||
      item.nomeCientifico.toLowerCase().includes(busca.toLowerCase())
    );

    return (
      <>
        <Cabecalho legenda="BOTÂNICA & CUIDADOS" />

        <TituloSecao
          etiqueta="CATÁLOGO BOTÂNICO"
          titulo="Plantas"
          descricao="Conheça algumas espécies e descubra como cuidar delas."
        />

        <View style={styles.buscaContainer}>
          <TextInput
            style={styles.buscaInput}
            placeholder="Buscar uma planta..."
            placeholderTextColor={C.cinza}
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        <View style={styles.secao}>
          {plantaSelecionada ? (
            <View style={styles.detalhePlanta}>
              <TouchableOpacity
                onPress={() => setPlantaSelecionada(null)}
              >
                <Text style={styles.voltarTexto}>← Voltar ao catálogo</Text>
              </TouchableOpacity>

              <Text style={styles.plantaSimboloGrande}>
                {plantaSelecionada.simbolo}
              </Text>
              <Text style={styles.plantaTitulo}>
                {plantaSelecionada.nome}
              </Text>
              <Text style={styles.plantaCientifico}>
                {plantaSelecionada.nomeCientifico}
              </Text>

              <View style={styles.cuidadoLinha}>
                <Text style={styles.cuidadoLabel}>Ambiente</Text>
                <Text style={styles.cuidadoTexto}>
                  {plantaSelecionada.ambiente}
                </Text>
              </View>

              <View style={styles.cuidadoLinha}>
                <Text style={styles.cuidadoLabel}>Iluminação</Text>
                <Text style={styles.cuidadoTexto}>
                  {plantaSelecionada.luz}
                </Text>
              </View>

              <View style={styles.cuidadoLinha}>
                <Text style={styles.cuidadoLabel}>Rega</Text>
                <Text style={styles.cuidadoTexto}>
                  {plantaSelecionada.rega}
                </Text>
              </View>
            </View>
          ) : (
            filtradas.map((item) => (
              <TouchableOpacity
                key={item.nome}
                style={styles.plantaCard}
                onPress={() => setPlantaSelecionada(item)}
              >
                <View style={styles.plantaIcone}>
                  <Text style={styles.plantaEmoji}>{item.simbolo}</Text>
                </View>

                <View style={styles.plantaInfo}>
                  <Text style={styles.plantaNome}>{item.nome}</Text>
                  <Text style={styles.plantaCientifico}>
                    {item.nomeCientifico}
                  </Text>
                  <Text style={styles.verDetalhes}>
                    Ver informações →
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}

          {filtradas.length === 0 && !plantaSelecionada ? (
            <View style={styles.vazio}>
              <Text style={styles.vazioTitulo}>
                Nenhuma planta encontrada.
              </Text>
            </View>
          ) : null}
        </View>

        <Rodape />
      </>
    );
  }

  function Perfil() {
    return (
      <>
        <Cabecalho legenda="SOBRE O APLICATIVO" />

        <View style={styles.perfilTopo}>
          <View style={styles.perfilAvatar}>
            <Text style={styles.perfilAvatarTexto}>L</Text>
          </View>
          <Text style={styles.perfilNome}>Lotus</Text>
          <Text style={styles.perfilDescricao}>
            Paisagismo e design de interiores
          </Text>
        </View>

        <View style={styles.perfilCard}>
          <Text style={styles.etiqueta}>SEU ESPAÇO DE CRIAÇÃO</Text>
          <Text style={styles.perfilTitulo}>Um pouco sobre o Lotus</Text>
          <Text style={styles.perfilTexto}>
            O Lotus reúne ferramentas e referências para ajudar
            no planejamento de ambientes e na valorização dos
            espaços por meio do paisagismo e do design de interiores.
          </Text>

          <View style={styles.perfilEstatistica}>
            <Text style={styles.perfilNumero}>{projetos.length}</Text>
            <Text style={styles.perfilLegenda}>Projetos registrados</Text>
          </View>
        </View>

        <View style={styles.perfilCard}>
          <Text style={styles.etiqueta}>NAVEGAÇÃO</Text>
          <TouchableOpacity
            style={styles.perfilLink}
            onPress={() => navegar('inicio')}
          >
            <Text style={styles.perfilLinkTexto}>Página inicial</Text>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.perfilLink}
            onPress={() => navegar('projetos')}
          >
            <Text style={styles.perfilLinkTexto}>Meus projetos</Text>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.perfilLink}
            onPress={() => navegar('inspiracoes')}
          >
            <Text style={styles.perfilLinkTexto}>Inspirações</Text>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.perfilLink}
            onPress={() => navegar('plantas')}
          >
            <Text style={styles.perfilLinkTexto}>Catálogo de plantas</Text>
            <Text style={styles.seta}>↗</Text>
          </TouchableOpacity>
        </View>

        <Rodape />
      </>
    );
  }

  function Rodape() {
    return (
      <View style={styles.rodape}>
        <Text style={styles.rodapeLogo}>lotus.</Text>
        <Text style={styles.rodapeTexto}>
          Cultive ideias. Transforme espaços.
        </Text>
        <Text style={styles.rodapeFinal}>
          PAISAGISMO & DESIGN DE INTERIORES
        </Text>
      </View>
    );
  }

  const paginas = [
    { id: 'inicio', simbolo: '⌂', nome: 'Início' },
    { id: 'projetos', simbolo: '▤', nome: 'Projetos' },
    { id: 'inspiracoes', simbolo: '◈', nome: 'Ideias' },
    { id: 'plantas', simbolo: '❧', nome: 'Plantas' },
    { id: 'perfil', simbolo: '○', nome: 'Perfil' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        key={tela}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {tela === 'inicio' && <Inicio />}
        {tela === 'projetos' && <Projetos />}
        {tela === 'inspiracoes' && <Inspiracoes />}
        {tela === 'plantas' && <Plantas />}
        {tela === 'perfil' && <Perfil />}
      </ScrollView>

      <View style={styles.nav}>
        {paginas.map((pagina) => (
          <TouchableOpacity
            key={pagina.id}
            style={styles.navItem}
            onPress={() => navegar(pagina.id)}
          >
            <Text
              style={[
                styles.navIcone,
                tela === pagina.id && styles.navAtivo,
              ]}
            >
              {pagina.simbolo}
            </Text>
            <Text
              style={[
                styles.navTexto,
                tela === pagina.id && styles.navAtivo,
              ]}
            >
              {pagina.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  },

  avatarTexto: {
    color: C.verde,
    fontSize: 17,
    fontWeight: 'bold',
  },

  hero: {
    backgroundColor: C.verde,
    marginHorizontal: 19,
    padding: 27,
    minHeight: 335,
    borderRadius: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  heroEtiqueta: {
    color: '#D5DFCE',
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: 20,
  },

  heroTitulo: {
    color: C.branco,
    fontSize: 35,
    lineHeight: 43,
    fontWeight: '500',
    maxWidth: 310,
  },

  heroDescricao: {
    color: '#E4E9DF',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 16,
    maxWidth: 310,
  },

  heroBotao: {
    backgroundColor: C.fundo,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
    marginTop: 24,
  },

  heroBotaoTexto: {
    color: C.verde,
    fontSize: 12,
    fontWeight: 'bold',
  },

  heroDecoracao: {
    position: 'absolute',
    color: '#FFFFFF',
    opacity: 0.08,
    fontSize: 75,
    right: 8,
    bottom: 8,
    fontWeight: 'bold',
  },

  resumo: {
    marginHorizontal: 22,
    marginTop: 22,
    paddingVertical: 20,
    backgroundColor: C.branco,
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
    marginTop: 5,
  },

  resumoLinha: {
    width: 1,
    height: 37,
    backgroundColor: C.linha,
  },

  secao: {
    marginTop: 34,
    paddingHorizontal: 22,
  },

  etiqueta: {
    color: C.marrom,
    fontSize: 9,
    letterSpacing: 2,
  },

  tituloSecaoTexto: {
    color: C.texto,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 18,
  },

  tituloSecao: {
    paddingHorizontal: 23,
    paddingTop: 10,
    paddingBottom: 25,
  },

  tituloGrande: {
    color: C.verde,
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 9,
  },

  descricaoTopo: {
    color: C.cinza,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },

  menuCard: {
    backgroundColor: C.branco,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.linha,
  },

  menuNumero: {
    color: C.marrom,
    fontSize: 13,
    letterSpacing: 1,
  },

  menuInfo: {
    flex: 1,
    marginLeft: 17,
  },

  menuTitulo: {
    color: C.verde,
    fontSize: 16,
    fontWeight: 'bold',
  },

  menuDescricao: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 5,
  },

  seta: {
    color: C.marrom,
    fontSize: 20,
  },

  dica: {
    marginHorizontal: 20,
    marginTop: 27,
    padding: 23,
    backgroundColor: C.areia,
  },

  dicaTitulo: {
    color: C.verde,
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 29,
    marginTop: 12,
  },

  dicaTexto: {
    color: C.texto,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
  },

  formulario: {
    backgroundColor: C.branco,
    marginHorizontal: 19,
    padding: 21,
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
    marginBottom: 12,
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
    paddingHorizontal: 13,
    paddingVertical: 13,
    color: C.texto,
    fontSize: 13,
  },

  inputGrande: {
    minHeight: 100,
  },

  botaoPrincipal: {
    backgroundColor: C.verde,
    padding: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  botaoPrincipalTexto: {
    color: C.branco,
    fontSize: 13,
    fontWeight: 'bold',
  },

  listaTopo: {
    marginHorizontal: 22,
    marginTop: 30,
    marginBottom: 15,
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

  vazio: {
    backgroundColor: C.areia,
    marginHorizontal: 20,
    padding: 27,
    alignItems: 'center',
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: C.linha,
  },

  projetoNumero: {
    width: 42,
    height: 42,
    backgroundColor: C.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },

  projetoNumeroTexto: {
    color: C.verde,
    fontSize: 21,
  },

  projetoInfo: {
    flex: 1,
    marginLeft: 13,
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
    marginTop: 10,
  },

  verDetalhes: {
    color: C.marrom,
    fontSize: 11,
    marginTop: 9,
  },

  excluirBotao: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5E9E5',
  },

  excluirTexto: {
    color: '#A45C4E',
    fontSize: 11,
    fontWeight: 'bold',
  },

  buscaContainer: {
    marginHorizontal: 22,
  },

  buscaInput: {
    backgroundColor: C.branco,
    borderWidth: 1,
    borderColor: C.linha,
    padding: 14,
    color: C.texto,
    fontSize: 13,
  },

  categorias: {
    marginTop: 17,
    maxHeight: 43,
  },

  categoriasConteudo: {
    paddingHorizontal: 22,
    gap: 8,
  },

  categoriaBotao: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: C.areia,
  },

  categoriaAtiva: {
    backgroundColor: C.verde,
  },

  categoriaTexto: {
    color: C.texto,
    fontSize: 11,
  },

  categoriaTextoAtivo: {
    color: C.branco,
  },

  inspiracaoCard: {
    backgroundColor: C.branco,
    padding: 22,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: C.linha,
  },

  inspiracaoFaixa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  inspiracaoNumero: {
    color: C.marrom,
    fontSize: 13,
  },

  inspiracaoCategoria: {
    color: C.salvia,
    fontSize: 9,
    letterSpacing: 1,
  },

  inspiracaoTitulo: {
    color: C.verde,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 18,
  },

  inspiracaoDescricao: {
    color: C.cinza,
    fontSize: 12,
    marginTop: 7,
    lineHeight: 19,
  },

  plantaCard: {
    backgroundColor: C.branco,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.linha,
  },

  plantaIcone: {
    width: 62,
    height: 62,
    backgroundColor: C.verdeClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },

  plantaEmoji: {
    fontSize: 29,
  },

  plantaInfo: {
    flex: 1,
    marginLeft: 15,
  },

  plantaNome: {
    color: C.verde,
    fontSize: 15,
    fontWeight: 'bold',
  },

  plantaCientifico: {
    color: C.cinza,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 4,
  },

  detalhePlanta: {
    backgroundColor: C.branco,
    padding: 23,
    borderWidth: 1,
    borderColor: C.linha,
  },

  voltarTexto: {
    color: C.marrom,
    fontSize: 12,
  },

  plantaSimboloGrande: {
    fontSize: 48,
    marginTop: 25,
  },

  plantaTitulo: {
    color: C.verde,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },

  cuidadoLinha: {
    borderTopWidth: 1,
    borderTopColor: C.linha,
    paddingVertical: 14,
    marginTop: 10,
  },

  cuidadoLabel: {
    color: C.marrom,
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },

  cuidadoTexto: {
    color: C.texto,
    fontSize: 13,
    lineHeight: 19,
  },

  perfilTopo: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  perfilAvatar: {
    width: 82,
    height: 82,
    borderRadius: 45,
    backgroundColor: C.verde,
    alignItems: 'center',
    justifyContent: 'center',
  },

  perfilAvatarTexto: {
    color: C.branco,
    fontSize: 35,
    fontWeight: 'bold',
  },

  perfilNome: {
    color: C.verde,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 13,
  },

  perfilDescricao: {
    color: C.cinza,
    fontSize: 12,
    marginTop: 5,
  },

  perfilCard: {
    backgroundColor: C.branco,
    marginHorizontal: 20,
    padding: 22,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.linha,
  },

  perfilTitulo: {
    color: C.verde,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },

  perfilTexto: {
    color: C.cinza,
    fontSize: 12,
    lineHeight: 20,
    marginTop: 10,
  },

  perfilEstatistica: {
    borderTopWidth: 1,
    borderTopColor: C.linha,
    marginTop: 20,
    paddingTop: 17,
  },

  perfilNumero: {
    color: C.verde,
    fontSize: 27,
    fontWeight: 'bold',
  },

  perfilLegenda: {
    color: C.cinza,
    fontSize: 11,
    marginTop: 4,
  },

  perfilLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: C.linha,
  },

  perfilLinkTexto: {
    color: C.texto,
    fontSize: 13,
  },

  rodape: {
    alignItems: 'center',
    paddingTop: 38,
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

  espacoFinal: {
    height: 30,
  },

  nav: {
    minHeight: 67,
    backgroundColor: C.branco,
    borderTopWidth: 1,
    borderTopColor: C.linha,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },

  navIcone: {
    color: C.cinza,
    fontSize: 20,
  },

  navTexto: {
    color: C.cinza,
    fontSize: 9,
    marginTop: 4,
  },

  navAtivo: {
    color: C.verde,
    fontWeight: 'bold',
  },
});