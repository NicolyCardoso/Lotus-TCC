import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  Image,
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


// Plantas iniciais do catálogo da tela Plantas
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

      {tela === 'plantas' ? (
        <PlantasScreen onVoltar={() => navegar('inicio')} />
      ) : (
        <ScrollView
          key={tela}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {tela === 'inicio' && <Inicio />}
          {tela === 'projetos' && <Projetos />}
          {tela === 'inspiracoes' && <Inspiracoes />}
          {tela === 'perfil' && <Perfil />}
        </ScrollView>
      )}

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


// TELA DE PLANTAS INTEGRADA AO APLICATIVO LOTUS
function PlantasScreen({ onVoltar }) {
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
          plantasStyles.filtro,
          categoriaAtiva === item && plantasStyles.filtroAtivo,
        ]}
        onPress={() => setCategoriaAtiva(item)}
      >
        <Text
          style={[
            plantasStyles.filtroTexto,
            categoriaAtiva === item && plantasStyles.filtroTextoAtivo,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      style={plantasStyles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* CABEÇALHO */}

      <View style={plantasStyles.header}>
        <View>
          <Text style={plantasStyles.headerLegenda}>
            PAISAGISMO & DESIGN DE INTERIORES
          </Text>

          <Text style={plantasStyles.logo}>
            lotus<Text style={plantasStyles.ponto}>.</Text>
          </Text>
        </View>

        <View style={plantasStyles.avatar}>
          <Text style={plantasStyles.avatarTexto}>L</Text>
        </View>
      </View>

      <View style={plantasStyles.conteudo}>

        <TouchableOpacity
          style={plantasStyles.voltar}
          onPress={onVoltar}
        >
          <Text style={plantasStyles.voltarTexto}>
            ← Voltar ao início
          </Text>
        </TouchableOpacity>

        {/* TÍTULO */}

        <Text style={plantasStyles.etiqueta}>
          DESCUBRA O MUNDO VERDE
        </Text>

        <Text style={plantasStyles.titulo}>
          Universo das plantas
        </Text>

        <Text style={plantasStyles.descricao}>
          Conheça espécies, descubra cuidados e encontre
          a planta ideal para transformar seu espaço.
        </Text>

        {/* DESTAQUE */}

        <View style={plantasStyles.hero}>
          <Text style={plantasStyles.heroEmoji}>🌿</Text>

          <Text style={plantasStyles.heroTitulo}>
            Um novo jeito de cultivar vida.
          </Text>

          <Text style={plantasStyles.heroDescricao}>
            Pequenos detalhes verdes podem transformar
            qualquer ambiente em um lugar especial.
          </Text>

          <Text style={plantasStyles.heroNumero}>01 / 04</Text>
        </View>

        {/* PESQUISA */}

        <Text style={plantasStyles.secaoTitulo}>
          Encontre sua planta
        </Text>

        <TextInput
          style={plantasStyles.pesquisa}
          placeholder="⌕  Buscar plantas..."
          placeholderTextColor={C.cinza}
          value={busca}
          onChangeText={setBusca}
        />

        {/* CATEGORIAS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={plantasStyles.categorias}
        >
          {categorias.map(campoCategoria)}
        </ScrollView>

        {/* CATÁLOGO */}

        <View style={plantasStyles.listaTopo}>
          <View>
            <Text style={plantasStyles.secaoTitulo}>
              Espécies em destaque
            </Text>

            <Text style={plantasStyles.listaDescricao}>
              Encontre sua próxima companheira verde.
            </Text>
          </View>

          <View style={plantasStyles.contador}>
            <Text style={plantasStyles.contadorTexto}>
              {plantasFiltradas.length}
            </Text>
          </View>
        </View>

        <View style={plantasStyles.grade}>
          {plantasFiltradas.map((planta) => (
            <View key={planta.id} style={plantasStyles.cardPlanta}>

              <Image
                source={{ uri: planta.imagem }}
                style={plantasStyles.imagemPlanta}
                resizeMode="cover"
              />

              <View style={plantasStyles.cardConteudo}>
                <Text style={plantasStyles.plantaCategoria}>
                  {planta.categoria.toUpperCase()}
                </Text>

                <Text style={plantasStyles.plantaNome}>
                  {planta.nome}
                </Text>

                <Text style={plantasStyles.cuidado}>
                  ☀ {planta.luz}
                </Text>

                <Text style={plantasStyles.cuidado}>
                  💧 {planta.agua}
                </Text>

                <TouchableOpacity
                  style={plantasStyles.botaoExcluir}
                  onPress={() => excluirPlanta(planta.id)}
                >
                  <Text style={plantasStyles.botaoExcluirTexto}>
                    Remover planta ×
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {plantasFiltradas.length === 0 && (
          <View style={plantasStyles.vazio}>
            <Text style={plantasStyles.vazioEmoji}>🍃</Text>
            <Text style={plantasStyles.vazioTitulo}>
              Nenhuma planta encontrada.
            </Text>
            <Text style={plantasStyles.vazioDescricao}>
              Tente pesquisar por outro nome ou categoria.
            </Text>
          </View>
        )}

        {/* CADASTRO */}

        <View style={plantasStyles.formulario}>
          <Text style={plantasStyles.formEtiqueta}>
            SUA COLEÇÃO VERDE
          </Text>

          <Text style={plantasStyles.formTitulo}>
            Adicione uma nova planta
          </Text>

          <Text style={plantasStyles.formDescricao}>
            Cadastre novas espécies e organize seu próprio
            catálogo de plantas.
          </Text>

          <Text style={plantasStyles.label}>
            Nome da planta *
          </Text>

          <TextInput
            style={plantasStyles.input}
            placeholder="Ex.: Samambaia"
            placeholderTextColor={C.cinza}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={plantasStyles.label}>
            Categoria
          </Text>

          <View style={plantasStyles.opcoes}>
            {categorias.slice(1).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  plantasStyles.opcao,
                  categoria === item && plantasStyles.opcaoAtiva,
                ]}
                onPress={() => setCategoria(item)}
              >
                <Text
                  style={[
                    plantasStyles.opcaoTexto,
                    categoria === item && plantasStyles.opcaoTextoAtivo,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={plantasStyles.label}>
            Iluminação *
          </Text>

          <TextInput
            style={plantasStyles.input}
            placeholder="Ex.: Luz indireta"
            placeholderTextColor={C.cinza}
            value={luz}
            onChangeText={setLuz}
          />

          <Text style={plantasStyles.label}>
            Cuidados com a água *
          </Text>

          <TextInput
            style={plantasStyles.input}
            placeholder="Ex.: Regar duas vezes por semana"
            placeholderTextColor={C.cinza}
            value={agua}
            onChangeText={setAgua}
          />

          <TouchableOpacity
            style={plantasStyles.botaoCriar}
            onPress={adicionarPlanta}
          >
            <Text style={plantasStyles.botaoCriarTexto}>
              + Adicionar planta
            </Text>
          </TouchableOpacity>
        </View>

        {/* RODAPÉ */}

        <View style={plantasStyles.rodape}>
          <Text style={plantasStyles.rodapeLogo}>lotus.</Text>

          <Text style={plantasStyles.rodapeTexto}>
            Cultive ideias. Transforme espaços.
          </Text>

          <Text style={plantasStyles.rodapeFinal}>
            FEITO PARA FLORESCER ♡
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const plantasStyles = StyleSheet.create({
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