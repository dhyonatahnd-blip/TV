export type LanguageId = 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'ja-JP';

export interface LanguageOption {
  id: LanguageId;
  shortCode: string;
  nativeName: string;
  englishName: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: 'pt-BR', shortCode: 'PT', nativeName: 'Português (BR)', englishName: 'Portuguese' },
  { id: 'en-US', shortCode: 'EN', nativeName: 'English', englishName: 'English' },
  { id: 'es-ES', shortCode: 'ES', nativeName: 'Español', englishName: 'Spanish' },
  { id: 'fr-FR', shortCode: 'FR', nativeName: 'Français', englishName: 'French' },
  { id: 'de-DE', shortCode: 'DE', nativeName: 'Deutsch', englishName: 'German' },
  { id: 'ja-JP', shortCode: 'JA', nativeName: '日本語', englishName: 'Japanese' },
];

export interface TvTranslations {
  nav: {
    home: string;
    films: string;
    music: string;
    internet: string;
    stores: string;
    primfeed: string;
    konkord: string;
    settings: string;
    cinemaMode: string;
    online: string;
    offline: string;
    languageLabel: string;
  };
  common: {
    backHome: string;
    exitCinema: string;
    cinemaMode: string;
    copied: string;
    copyLink: string;
    copyAddress: string;
    openExternally: string;
    refresh: string;
    cancel: string;
    save: string;
    saved: string;
    search: string;
    loading: string;
  };
  home: {
    heroSlides: {
      konkord: { kicker: string; title: string; description: string; cta: string };
      music: { kicker: string; title: string; description: string; cta: string };
      cinema: { kicker: string; title: string; description: string; cta: string };
    };
    personalizeTv: string;
    servicesTitle: string;
    servicesSubtitle: string;
    settingsBtn: string;
    cards: {
      konkord: { title: string; subtitle: string; meta: string; cta: string };
      films: { title: string; subtitle: string; meta: string; cta: string };
      music: { title: string; subtitle: string; subtitlePlaying: string; meta: string; cta: string };
      primfeed: { title: string; subtitle: string; meta: string; cta: string };
      internet: { title: string; subtitle: string; meta: string; cta: string };
      store: {
        title: string;
        subtitleUnset: string;
        subtitleSet: string;
        metaSet: string;
        metaUnset: string;
        ctaSet: string;
        ctaUnset: string;
      };
    };
  };
  films: {
    title: string;
    subtitle: string;
    youtubeTab: string;
    netflixTab: string;
    ytPlaceholder: string;
    playVideo: string;
    invalidYt: string;
    expand: string;
    shrink: string;
    loadingPlayer: string;
    ytRestrictHint: string;
    openInYt: string;
    searchYtTitle: string;
    searchYtPlaceholder: string;
    recommendedChannels: string;
    directEmbed: string;
    recentlyPlayed: string;
    netflixKicker: string;
    netflixDesc: string;
    openNetflixExt: string;
    configuredDest: string;
  };
  music: {
    title: string;
    subtitle: string;
    playlistTab: string;
    servicesTab: string;
    studioAudio: string;
    directStream: string;
    queueTitle: string;
    nativePlayback: string;
    addAudioTitle: string;
    trackNamePlaceholder: string;
    artistPlaceholder: string;
    urlPlaceholder: string;
    addBtn: string;
    onlineServicesTitle: string;
    onlineServicesDesc: string;
    openWebApp: string;
    openWebPlayer: string;
    openPlatform: string;
    embedLabel: string;
    embedPlaceholder: string;
    loadBtn: string;
    embedError: string;
    audioError: string;
    playBlockedError: string;
  };
  browser: {
    addressPlaceholder: string;
    go: string;
    googlePlaceholder: string;
    externalBrowser: string;
    bookmarks: string;
    blockedTitle: string;
    blockedDesc: string;
    openExternalBtn: string;
    tryEmbedAnyway: string;
    loadingPage: string;
  };
  portal: {
    configureStoreTitle: string;
    configureStoreSubtitle: string;
    storeUrlLabel: string;
    storeUrlPlaceholder: string;
    saveAndOpen: string;
    goToSettings: string;
    changeUrl: string;
    connectingTo: string;
    slFrameNotice: string;
    openInExternalBrowser: string;
    storeTitle: string;
    storeSubtitle: string;
    primfeedSubtitle: string;
    konkordSubtitle: string;
  };
  settings: {
    title: string;
    subtitle: string;
    restoreDefaults: string;
    saveChanges: string;
    languageSectionTitle: string;
    languageSectionSubtitle: string;
    themeSectionTitle: string;
    themes: {
      obsidian: { name: string; desc: string };
      violet: { name: string; desc: string };
      graphite: { name: string; desc: string };
      light: { name: string; desc: string };
    };
    storeUrlLabel: string;
    storeUrlPlaceholder: string;
    storeUrlHint: string;
    browserHomeLabel: string;
    browserHomeHint: string;
    appLinksTitle: string;
    systemInfoTitle: string;
    currentResolution: string;
    detectedRatio: string;
    localStorage: string;
    storageActive: string;
    storageRestricted: string;
    networkConnection: string;
    connected: string;
    disconnected: string;
  };
}

const ptBR: TvTranslations = {
  nav: {
    home: 'INÍCIO',
    films: 'FILMES',
    music: 'MÚSICA',
    internet: 'INTERNET',
    stores: 'LOJAS',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'Configurações do Sistema',
    cinemaMode: 'Modo Cinema',
    online: 'Online',
    offline: 'Offline',
    languageLabel: 'Idioma',
  },
  common: {
    backHome: 'Voltar ao Início',
    exitCinema: 'Sair (ESC)',
    cinemaMode: 'Modo Cinema',
    copied: 'Copiado',
    copyLink: 'Copiar Link',
    copyAddress: 'Copiar Endereço',
    openExternally: 'Abrir Externamente',
    refresh: 'Atualizar',
    cancel: 'Cancelar',
    save: 'Salvar',
    saved: 'Salvo',
    search: 'Buscar',
    loading: 'Carregando...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: 'Ecossistema Oficial',
        title: 'Konkord Experience no Second Life',
        description:
          'Acesse o portal oficial Konkord diretamente na tela da sua televisão virtual com navegação fluida e interface otimizada.',
        cta: 'Abrir Konkord',
      },
      music: {
        kicker: 'Central de Áudio',
        title: 'Konkord Music & Streams Diretos',
        description:
          'Reproduza faixas em alta definição, conecte URLs de áudio MP3 ou acesse Spotify, YouTube Music e SoundCloud.',
        cta: 'Ouvir Música',
      },
      cinema: {
        kicker: 'Cinema & Vídeo',
        title: 'Filmes, YouTube e Entretenimento',
        description:
          'Reprodutor YouTube incorporado para vídeos e transmissões ao vivo, além de acesso rápido à Netflix.',
        cta: 'Explorar Filmes',
      },
    },
    personalizeTv: 'Personalizar TV',
    servicesTitle: 'Aplicativos e Serviços',
    servicesSubtitle: 'Selecione um aplicativo com o mouse ou navegue usando as setas do teclado',
    settingsBtn: 'Configurações',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: 'Portal oficial e projetos Konkord integrados na TV.',
        meta: 'Portal Oficial · Ecossistema Konkord',
        cta: 'Acessar Portal',
      },
      films: {
        title: 'FILMES & VÍDEO',
        subtitle: 'Player YouTube incorporado e acesso direto à Netflix.',
        meta: 'YouTube · Netflix · Streams',
        cta: 'Abrir Cinema',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'Player de áudio, streams MP3, Spotify, YouTube Music e SoundCloud.',
        subtitlePlaying: 'Tocando agora',
        meta: 'Áudio HD · Playlists · Rádio',
        cta: 'Abrir Player',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Rede social do Second Life para acompanhar fotos e eventos.',
        meta: 'primfeed.com · Comunidade SL',
        cta: 'Abrir Primfeed',
      },
      internet: {
        title: 'INTERNET & GOOGLE',
        subtitle: 'Navegador web integrado com pesquisa Google e barra de URL.',
        meta: 'Navegação · Pesquisa Web',
        cta: 'Navegar',
      },
      store: {
        title: 'LOJA VIRTUAL',
        subtitleUnset: 'Configure o endereço da sua loja no Second Life ou catálogo web.',
        subtitleSet: 'Loja configurada',
        metaSet: 'Endereço Ativo',
        metaUnset: 'URL Configurável',
        ctaSet: 'Visitar Loja',
        ctaUnset: 'Configurar Loja',
      },
    },
  },
  films: {
    title: 'Central de Filmes & Vídeo',
    subtitle: 'Reprodutor YouTube incorporado e acesso direto à plataforma Netflix',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'Cole um link ou ID do YouTube (ex: youtube.com/watch?v=...)',
    playVideo: 'Reproduzir Vídeo',
    invalidYt:
      'Link ou ID do YouTube inválido. Cole uma URL como youtube.com/watch?v=... ou o ID de 11 caracteres.',
    expand: 'Expandir',
    shrink: 'Reduzir',
    loadingPlayer: 'Carregando reprodutor YouTube...',
    ytRestrictHint: 'Se o proprietário do vídeo restringir incorporação, abra externamente.',
    openInYt: 'Abrir no YouTube',
    searchYtTitle: 'Pesquisar no YouTube',
    searchYtPlaceholder: 'Buscar filmes, clipes, canais...',
    recommendedChannels: 'Canais Recomendados',
    directEmbed: 'Incorporação Direta',
    recentlyPlayed: 'Reproduzidos recentemente',
    netflixKicker: 'Streaming Externo · Proteção DRM',
    netflixDesc:
      'Por políticas de segurança e proteção DRM (Widevine / X-Frame-Options), a Netflix não permite incorporação direta dentro de outras páginas web. Utilize o botão abaixo para abrir o serviço no navegador externo da sua sessão.',
    openNetflixExt: 'Abrir Netflix Externamente',
    configuredDest: 'Destino configurado',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'Reprodutor de áudio real, streams diretos MP3 e integração com plataformas online',
    playlistTab: 'Playlist & MP3',
    servicesTab: 'Serviços Online',
    studioAudio: 'Konkord Studio Audio',
    directStream: 'Stream / URL Direta',
    queueTitle: 'Fila de Reprodução',
    nativePlayback: 'Reprodução HTML5 Nativa',
    addAudioTitle: 'Adicionar Link Direto de Áudio (MP3 / Stream)',
    trackNamePlaceholder: 'Nome da música (opcional)',
    artistPlaceholder: 'Artista ou rádio (opcional)',
    urlPlaceholder: 'https://exemplo.com/musica.mp3',
    addBtn: 'Adicionar',
    onlineServicesTitle: 'Serviços de Streaming Online',
    onlineServicesDesc:
      'Plataformas completas exigem login e bloqueiam incorporação direta por DRM. Abra o serviço externamente ou cole um link de faixa/playlist do Spotify ou SoundCloud abaixo.',
    openWebApp: 'Abrir App Web',
    openWebPlayer: 'Abrir Web Player',
    openPlatform: 'Abrir Plataforma',
    embedLabel: 'Incorporar Faixa ou Playlist (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'Cole o link da música ou playlist...',
    loadBtn: 'Carregar',
    embedError:
      'Cole um link específico de faixa, álbum ou playlist do Spotify, SoundCloud ou YouTube Music.',
    audioError:
      'Não foi possível reproduzir este link de áudio. Verifique se o endereço aponta diretamente para um arquivo MP3/OGG/WAV ou stream público compatível com CORS.',
    playBlockedError:
      'Reprodução bloqueada pelo navegador ou formato de áudio incompatível. Clique em Play novamente ou teste outro link.',
  },
  browser: {
    addressPlaceholder: 'Digite um endereço web (https://...)',
    go: 'Ir',
    googlePlaceholder: 'Pesquisar no Google...',
    externalBrowser: 'Navegador Externo',
    bookmarks: 'Favoritos:',
    blockedTitle: 'Incorporação Bloqueada pelo Site de Destino',
    blockedDesc:
      'Este site utiliza políticas de segurança (X-Frame-Options ou CSP) que impedem a exibição dentro de quadros embutidos. Para evitar tela em branco, abra diretamente no navegador externo.',
    openExternalBtn: 'ABRIR NO NAVEGADOR EXTERNO',
    tryEmbedAnyway: 'Tentar incorporar mesmo assim',
    loadingPage: 'Carregando página...',
  },
  portal: {
    configureStoreTitle: 'Configurar Endereço da Loja',
    configureStoreSubtitle:
      'Insira a URL da sua loja do Second Life Marketplace, CasperVend ou catálogo web.',
    storeUrlLabel: 'Endereço URL da Loja',
    storeUrlPlaceholder: 'https://sua-loja-ou-marketplace.com',
    saveAndOpen: 'Salvar e Abrir Loja',
    goToSettings: 'Ir para Configurações',
    changeUrl: 'Alterar URL',
    connectingTo: 'Conectando a',
    slFrameNotice:
      'Caso o site bloqueie exibição embutida no visualizador do Second Life, utilize o botão ao lado.',
    openInExternalBrowser: 'no navegador externo',
    storeTitle: 'LOJA VIRTUAL',
    storeSubtitle: 'Second Life & Catálogo',
    primfeedSubtitle: 'Comunidade Second Life',
    konkordSubtitle: 'Portal Oficial',
  },
  settings: {
    title: 'Configurações do Sistema',
    subtitle: 'Personalize o idioma, aparência, loja virtual, página inicial e links dos aplicativos',
    restoreDefaults: 'Restaurar Padrões',
    saveChanges: 'Salvar Alterações',
    languageSectionTitle: 'Idioma da Televisão (Global)',
    languageSectionSubtitle: 'Altere o idioma da interface, relógio e formatos de data.',
    themeSectionTitle: 'Aparência e Tema da Televisão',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: 'Preto profundo com acentos em azul elétrico.' },
      violet: { name: 'Violet Cinema', desc: 'Grafite noturno com iluminação em violeta.' },
      graphite: { name: 'Graphite Studio', desc: 'Contraste neutro em grafite com ciano suave.' },
      light: { name: 'Daylight Glass', desc: 'Modo claro para ambientes virtuais iluminados.' },
    },
    storeUrlLabel: 'URL da Loja Virtual (Lojas)',
    storeUrlPlaceholder: 'Deixe vazio ou insira https://...',
    storeUrlHint: 'Endereço exibido na seção LOJAS. Você pode limpar para manter desativado.',
    browserHomeLabel: 'Página Inicial do Navegador',
    browserHomeHint: 'URL carregada ao abrir a aba INTERNET ou pressionar o botão Início.',
    appLinksTitle: 'Links dos Aplicativos e Serviços',
    systemInfoTitle: 'Informações da Televisão e Exibição',
    currentResolution: 'Resolução Atual',
    detectedRatio: 'Proporção Detectada',
    localStorage: 'Armazenamento Local',
    storageActive: 'Disponível (Ativo)',
    storageRestricted: 'Restrito na Sessão',
    networkConnection: 'Conexão de Rede',
    connected: 'Conectado',
    disconnected: 'Offline',
  },
};

const enUS: TvTranslations = {
  nav: {
    home: 'HOME',
    films: 'MOVIES',
    music: 'MUSIC',
    internet: 'INTERNET',
    stores: 'STORES',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'System Settings',
    cinemaMode: 'Cinema Mode',
    online: 'Online',
    offline: 'Offline',
    languageLabel: 'Language',
  },
  common: {
    backHome: 'Back to Home',
    exitCinema: 'Exit (ESC)',
    cinemaMode: 'Cinema Mode',
    copied: 'Copied',
    copyLink: 'Copy Link',
    copyAddress: 'Copy Address',
    openExternally: 'Open Externally',
    refresh: 'Refresh',
    cancel: 'Cancel',
    save: 'Save',
    saved: 'Saved',
    search: 'Search',
    loading: 'Loading...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: 'Official Ecosystem',
        title: 'Konkord Experience in Second Life',
        description:
          'Access the official Konkord portal directly on your virtual television screen with smooth navigation and cinema-grade clarity.',
        cta: 'Open Konkord',
      },
      music: {
        kicker: 'Audio Hub',
        title: 'Konkord Music & Direct Streams',
        description:
          'Play high-definition tracks, connect direct MP3 audio URLs, or launch Spotify, YouTube Music, and SoundCloud.',
        cta: 'Listen Now',
      },
      cinema: {
        kicker: 'Cinema & Video',
        title: 'Movies, YouTube & Entertainment',
        description:
          'Embedded YouTube player for videos and live streams, plus quick access to Netflix.',
        cta: 'Explore Movies',
      },
    },
    personalizeTv: 'Customize TV',
    servicesTitle: 'Apps & Services',
    servicesSubtitle: 'Select an app with your mouse or navigate using arrow keys',
    settingsBtn: 'Settings',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: 'Official portal and Konkord projects integrated directly on your TV.',
        meta: 'Official Portal · Konkord Ecosystem',
        cta: 'Open Portal',
      },
      films: {
        title: 'MOVIES & VIDEO',
        subtitle: 'Embedded YouTube player and direct access to Netflix.',
        meta: 'YouTube · Netflix · Streams',
        cta: 'Open Cinema',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'Audio player, MP3 streams, Spotify, YouTube Music, and SoundCloud.',
        subtitlePlaying: 'Now playing',
        meta: 'HD Audio · Playlists · Radio',
        cta: 'Open Player',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Second Life social network to follow photos, creators, and events.',
        meta: 'primfeed.com · SL Community',
        cta: 'Open Primfeed',
      },
      internet: {
        title: 'INTERNET & GOOGLE',
        subtitle: 'Built-in web browser with Google Search and address bar.',
        meta: 'Browsing · Web Search',
        cta: 'Browse Web',
      },
      store: {
        title: 'VIRTUAL STORE',
        subtitleUnset: 'Configure your Second Life store URL or online catalog.',
        subtitleSet: 'Configured store',
        metaSet: 'Active URL',
        metaUnset: 'Configurable URL',
        ctaSet: 'Visit Store',
        ctaUnset: 'Configure Store',
      },
    },
  },
  films: {
    title: 'Movies & Video Hub',
    subtitle: 'Embedded YouTube player and direct access to Netflix',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'Paste a YouTube URL or Video ID (e.g. youtube.com/watch?v=...)',
    playVideo: 'Play Video',
    invalidYt:
      'Invalid YouTube link or ID. Paste a URL like youtube.com/watch?v=... or an 11-character ID.',
    expand: 'Expand',
    shrink: 'Collapse',
    loadingPlayer: 'Loading YouTube player...',
    ytRestrictHint: 'If the video owner restricts embedding, open it externally.',
    openInYt: 'Open on YouTube',
    searchYtTitle: 'Search YouTube',
    searchYtPlaceholder: 'Search movies, music videos, channels...',
    recommendedChannels: 'Recommended Channels',
    directEmbed: 'Direct Embed',
    recentlyPlayed: 'Recently played',
    netflixKicker: 'External Streaming · DRM Protected',
    netflixDesc:
      'Due to security and DRM policies (Widevine / X-Frame-Options), Netflix blocks embedding inside external web frames. Use the button below to launch Netflix in your external browser.',
    openNetflixExt: 'Open Netflix Externally',
    configuredDest: 'Configured destination',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'Real HTML5 audio player, direct MP3 streams, and online streaming integrations',
    playlistTab: 'Playlist & MP3',
    servicesTab: 'Online Services',
    studioAudio: 'Konkord Studio Audio',
    directStream: 'Direct Stream / URL',
    queueTitle: 'Playback Queue',
    nativePlayback: 'Native HTML5 Audio',
    addAudioTitle: 'Add Direct Audio Link (MP3 / Stream)',
    trackNamePlaceholder: 'Track title (optional)',
    artistPlaceholder: 'Artist or station (optional)',
    urlPlaceholder: 'https://example.com/track.mp3',
    addBtn: 'Add Track',
    onlineServicesTitle: 'Online Streaming Services',
    onlineServicesDesc:
      'Full streaming web apps require sign-in and block framing due to DRM. Launch the service externally or paste a specific Spotify or SoundCloud track/playlist URL below.',
    openWebApp: 'Open Web App',
    openWebPlayer: 'Open Web Player',
    openPlatform: 'Open Platform',
    embedLabel: 'Embed Track or Playlist (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'Paste a track or playlist link...',
    loadBtn: 'Load',
    embedError:
      'Please paste a specific track, album, or playlist link from Spotify, SoundCloud, or YouTube Music.',
    audioError:
      'Could not play this audio URL. Ensure it points directly to a public MP3/OGG/WAV file or CORS-compatible stream.',
    playBlockedError:
      'Playback blocked by the browser or unsupported audio format. Click Play again or try another URL.',
  },
  browser: {
    addressPlaceholder: 'Enter a web address (https://...)',
    go: 'Go',
    googlePlaceholder: 'Search Google...',
    externalBrowser: 'External Browser',
    bookmarks: 'Bookmarks:',
    blockedTitle: 'Embedding Blocked by Target Website',
    blockedDesc:
      'This website enforces security headers (X-Frame-Options or CSP) that prevent display inside embedded frames. To avoid a blank screen, open it in an external browser.',
    openExternalBtn: 'OPEN IN EXTERNAL BROWSER',
    tryEmbedAnyway: 'Try embedding anyway',
    loadingPage: 'Loading page...',
  },
  portal: {
    configureStoreTitle: 'Configure Store Address',
    configureStoreSubtitle:
      'Enter the URL for your Second Life Marketplace store, CasperVend, or web catalog.',
    storeUrlLabel: 'Store URL Address',
    storeUrlPlaceholder: 'https://your-store-or-marketplace.com',
    saveAndOpen: 'Save & Open Store',
    goToSettings: 'Go to Settings',
    changeUrl: 'Change URL',
    connectingTo: 'Connecting to',
    slFrameNotice:
      'If the website blocks embedded framing inside the Second Life viewer, use the button on the right.',
    openInExternalBrowser: 'in external browser',
    storeTitle: 'VIRTUAL STORE',
    storeSubtitle: 'Second Life & Catalog',
    primfeedSubtitle: 'Second Life Community',
    konkordSubtitle: 'Official Portal',
  },
  settings: {
    title: 'System Settings',
    subtitle: 'Customize language, appearance, virtual store, browser homepage, and app links',
    restoreDefaults: 'Restore Defaults',
    saveChanges: 'Save Changes',
    languageSectionTitle: 'Television Language (Global)',
    languageSectionSubtitle: 'Switch the interface language, clock, and date formats.',
    themeSectionTitle: 'Television Theme & Appearance',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: 'Deep black with electric blue accents.' },
      violet: { name: 'Violet Cinema', desc: 'Midnight graphite with violet illumination.' },
      graphite: { name: 'Graphite Studio', desc: 'Neutral graphite contrast with soft cyan.' },
      light: { name: 'Daylight Glass', desc: 'Light mode for brightly lit virtual rooms.' },
    },
    storeUrlLabel: 'Virtual Store URL (Stores)',
    storeUrlPlaceholder: 'Leave empty or enter https://...',
    storeUrlHint: 'URL shown in the STORES section. Clear it to keep unconfigured.',
    browserHomeLabel: 'Browser Homepage',
    browserHomeHint: 'URL loaded when opening INTERNET or pressing Home.',
    appLinksTitle: 'App & Service Links',
    systemInfoTitle: 'Television & Display Diagnostics',
    currentResolution: 'Current Resolution',
    detectedRatio: 'Detected Aspect Ratio',
    localStorage: 'Local Storage',
    storageActive: 'Available (Active)',
    storageRestricted: 'Restricted in Session',
    networkConnection: 'Network Connection',
    connected: 'Connected',
    disconnected: 'Offline',
  },
};

const esES: TvTranslations = {
  nav: {
    home: 'INICIO',
    films: 'CINE',
    music: 'MÚSICA',
    internet: 'INTERNET',
    stores: 'TIENDAS',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'Configuración del Sistema',
    cinemaMode: 'Modo Cine',
    online: 'En línea',
    offline: 'Sin conexión',
    languageLabel: 'Idioma',
  },
  common: {
    backHome: 'Volver al Inicio',
    exitCinema: 'Salir (ESC)',
    cinemaMode: 'Modo Cine',
    copied: 'Copiado',
    copyLink: 'Copiar Enlace',
    copyAddress: 'Copiar Dirección',
    openExternally: 'Abrir Externamente',
    refresh: 'Actualizar',
    cancel: 'Cancelar',
    save: 'Guardar',
    saved: 'Guardado',
    search: 'Buscar',
    loading: 'Cargando...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: 'Ecosistema Oficial',
        title: 'Konkord Experience en Second Life',
        description:
          'Accede al portal oficial de Konkord directamente en tu televisor virtual con navegación fluida y diseño cinematográfico.',
        cta: 'Abrir Konkord',
      },
      music: {
        kicker: 'Centro de Audio',
        title: 'Konkord Music y Streams Directos',
        description:
          'Reproduce pistas en alta definición, conecta URLs MP3 o accede a Spotify, YouTube Music y SoundCloud.',
        cta: 'Escuchar Música',
      },
      cinema: {
        kicker: 'Cine y Video',
        title: 'Películas, YouTube y Entretenimiento',
        description:
          'Reproductor de YouTube integrado para videos y transmisiones en vivo, además de acceso directo a Netflix.',
        cta: 'Explorar Cine',
      },
    },
    personalizeTv: 'Personalizar TV',
    servicesTitle: 'Aplicaciones y Servicios',
    servicesSubtitle: 'Selecciona una aplicación con el ratón o usa las flechas del teclado',
    settingsBtn: 'Configuración',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: 'Portal oficial y proyectos Konkord integrados en la TV.',
        meta: 'Portal Oficial · Ecosistema Konkord',
        cta: 'Abrir Portal',
      },
      films: {
        title: 'PELÍCULAS Y VIDEO',
        subtitle: 'Reproductor de YouTube integrado y acceso directo a Netflix.',
        meta: 'YouTube · Netflix · Streams',
        cta: 'Abrir Cine',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'Reproductor de audio, streams MP3, Spotify, YouTube Music y SoundCloud.',
        subtitlePlaying: 'Reproduciendo ahora',
        meta: 'Audio HD · Listas · Radio',
        cta: 'Abrir Reproductor',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Red social de Second Life para seguir fotos y eventos.',
        meta: 'primfeed.com · Comunidad SL',
        cta: 'Abrir Primfeed',
      },
      internet: {
        title: 'INTERNET Y GOOGLE',
        subtitle: 'Navegador web integrado con búsqueda de Google y barra de URL.',
        meta: 'Navegación · Búsqueda Web',
        cta: 'Navegar',
      },
      store: {
        title: 'TIENDA VIRTUAL',
        subtitleUnset: 'Configura la dirección de tu tienda de Second Life o catálogo web.',
        subtitleSet: 'Tienda configurada',
        metaSet: 'URL Activa',
        metaUnset: 'URL Configurable',
        ctaSet: 'Visitar Tienda',
        ctaUnset: 'Configurar Tienda',
      },
    },
  },
  films: {
    title: 'Centro de Cine y Video',
    subtitle: 'Reproductor YouTube integrado y acceso directo a Netflix',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'Pega un enlace o ID de YouTube (ej: youtube.com/watch?v=...)',
    playVideo: 'Reproducir Video',
    invalidYt:
      'Enlace o ID de YouTube inválido. Pega una URL como youtube.com/watch?v=... o un ID de 11 caracteres.',
    expand: 'Expandir',
    shrink: 'Reducir',
    loadingPlayer: 'Cargando reproductor de YouTube...',
    ytRestrictHint: 'Si el propietario restringe la inserción, ábrelo externamente.',
    openInYt: 'Abrir en YouTube',
    searchYtTitle: 'Buscar en YouTube',
    searchYtPlaceholder: 'Buscar películas, música, canales...',
    recommendedChannels: 'Canales Recomendados',
    directEmbed: 'Inserción Directa',
    recentlyPlayed: 'Reproducidos recientemente',
    netflixKicker: 'Streaming Externo · Protección DRM',
    netflixDesc:
      'Por políticas de seguridad y protección DRM (Widevine / X-Frame-Options), Netflix no permite la inserción dentro de otros marcos web. Usa el botón de abajo para abrirlo en tu navegador externo.',
    openNetflixExt: 'Abrir Netflix Externamente',
    configuredDest: 'Destino configurado',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'Reproductor de audio HTML5 real, streams MP3 directos y plataformas online',
    playlistTab: 'Lista y MP3',
    servicesTab: 'Servicios Online',
    studioAudio: 'Konkord Studio Audio',
    directStream: 'Stream / URL Directa',
    queueTitle: 'Cola de Reproducción',
    nativePlayback: 'Audio HTML5 Nativo',
    addAudioTitle: 'Añadir Enlace Directo de Audio (MP3 / Stream)',
    trackNamePlaceholder: 'Nombre de la pista (opcional)',
    artistPlaceholder: 'Artista o radio (opcional)',
    urlPlaceholder: 'https://ejemplo.com/musica.mp3',
    addBtn: 'Añadir',
    onlineServicesTitle: 'Servicios de Streaming Online',
    onlineServicesDesc:
      'Las plataformas completas requieren inicio de sesión y bloquean marcos por DRM. Abre el servicio externamente o pega un enlace de canción/lista de Spotify o SoundCloud abajo.',
    openWebApp: 'Abrir App Web',
    openWebPlayer: 'Abrir Reproductor Web',
    openPlatform: 'Abrir Plataforma',
    embedLabel: 'Insertar Canción o Lista (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'Pega el enlace de una canción o lista...',
    loadBtn: 'Cargar',
    embedError:
      'Pega un enlace específico de canción, álbum o lista de Spotify, SoundCloud o YouTube Music.',
    audioError:
      'No se pudo reproducir este enlace de audio. Verifica que apunte a un archivo MP3/OGG/WAV público o stream compatible con CORS.',
    playBlockedError:
      'Reproducción bloqueada por el navegador o formato incompatible. Haz clic en Play de nuevo.',
  },
  browser: {
    addressPlaceholder: 'Escribe una dirección web (https://...)',
    go: 'Ir',
    googlePlaceholder: 'Buscar en Google...',
    externalBrowser: 'Navegador Externo',
    bookmarks: 'Marcadores:',
    blockedTitle: 'Inserción Bloqueada por el Sitio de Destino',
    blockedDesc:
      'Este sitio aplica políticas de seguridad (X-Frame-Options o CSP) que impiden mostrarlo en marcos integrados. Ábrelo en un navegador externo para evitar pantallas en blanco.',
    openExternalBtn: 'ABRIR EN NAVEGADOR EXTERNO',
    tryEmbedAnyway: 'Intentar insertar de todos modos',
    loadingPage: 'Cargando página...',
  },
  portal: {
    configureStoreTitle: 'Configurar Dirección de Tienda',
    configureStoreSubtitle:
      'Introduce la URL de tu tienda en Second Life Marketplace, CasperVend o catálogo web.',
    storeUrlLabel: 'Dirección URL de la Tienda',
    storeUrlPlaceholder: 'https://tu-tienda-o-marketplace.com',
    saveAndOpen: 'Guardar y Abrir Tienda',
    goToSettings: 'Ir a Configuración',
    changeUrl: 'Cambiar URL',
    connectingTo: 'Conectando a',
    slFrameNotice:
      'Si el sitio bloquea la inserción en el visor de Second Life, usa el botón de la derecha.',
    openInExternalBrowser: 'en navegador externo',
    storeTitle: 'TIENDA VIRTUAL',
    storeSubtitle: 'Second Life y Catálogo',
    primfeedSubtitle: 'Comunidad Second Life',
    konkordSubtitle: 'Portal Oficial',
  },
  settings: {
    title: 'Configuración del Sistema',
    subtitle: 'Personaliza idioma, apariencia, tienda virtual, página de inicio y enlaces',
    restoreDefaults: 'Restaurar Valores',
    saveChanges: 'Guardar Cambios',
    languageSectionTitle: 'Idioma del Televisor (Global)',
    languageSectionSubtitle: 'Cambia el idioma de la interfaz, reloj y formato de fecha.',
    themeSectionTitle: 'Apariencia y Tema',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: 'Negro profundo con acentos en azul eléctrico.' },
      violet: { name: 'Violet Cinema', desc: 'Grafito nocturno con iluminación violeta.' },
      graphite: { name: 'Graphite Studio', desc: 'Contraste grafito neutro con cian suave.' },
      light: { name: 'Daylight Glass', desc: 'Modo claro para entornos virtuales luminosos.' },
    },
    storeUrlLabel: 'URL de Tienda Virtual (Tiendas)',
    storeUrlPlaceholder: 'Déjalo vacío o escribe https://...',
    storeUrlHint: 'Dirección mostrada en TIENDAS. Bórrala para desactivarla.',
    browserHomeLabel: 'Página de Inicio del Navegador',
    browserHomeHint: 'URL cargada al abrir INTERNET o pulsar Inicio.',
    appLinksTitle: 'Enlaces de Aplicaciones y Servicios',
    systemInfoTitle: 'Información del Televisor y Pantalla',
    currentResolution: 'Resolución Actual',
    detectedRatio: 'Proporción Detectada',
    localStorage: 'Almacenamiento Local',
    storageActive: 'Disponible (Activo)',
    storageRestricted: 'Restringido en Sesión',
    networkConnection: 'Conexión de Red',
    connected: 'Conectado',
    disconnected: 'Sin conexión',
  },
};

const frFR: TvTranslations = {
  nav: {
    home: 'ACCUEIL',
    films: 'FILMS',
    music: 'MUSIQUE',
    internet: 'INTERNET',
    stores: 'BOUTIQUE',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'Paramètres du Système',
    cinemaMode: 'Mode Cinéma',
    online: 'En ligne',
    offline: 'Hors ligne',
    languageLabel: 'Langue',
  },
  common: {
    backHome: "Retour à l'accueil",
    exitCinema: 'Quitter (ESC)',
    cinemaMode: 'Mode Cinéma',
    copied: 'Copié',
    copyLink: 'Copier le lien',
    copyAddress: "Copier l'adresse",
    openExternally: 'Ouvrir en externe',
    refresh: 'Actualiser',
    cancel: 'Annuler',
    save: 'Enregistrer',
    saved: 'Enregistré',
    search: 'Rechercher',
    loading: 'Chargement...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: 'Écosystème Officiel',
        title: 'Konkord Experience dans Second Life',
        description:
          'Accédez au portail officiel Konkord directement depuis votre télévision virtuelle avec une navigation fluide.',
        cta: 'Ouvrir Konkord',
      },
      music: {
        kicker: 'Centre Audio',
        title: 'Konkord Music & Flux Directs',
        description:
          'Écoutez des pistes audio, connectez des flux MP3 ou accédez à Spotify, YouTube Music et SoundCloud.',
        cta: 'Écouter',
      },
      cinema: {
        kicker: 'Cinéma & Vidéo',
        title: 'Films, YouTube et Divertissement',
        description:
          'Lecteur YouTube intégré pour vidéos et directs, ainsi que accès rapide à Netflix.',
        cta: 'Explorer Films',
      },
    },
    personalizeTv: 'Personnaliser la TV',
    servicesTitle: 'Applications et Services',
    servicesSubtitle: 'Sélectionnez une application ou naviguez avec les flèches du clavier',
    settingsBtn: 'Paramètres',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: 'Portail officiel et projets Konkord intégrés sur la TV.',
        meta: 'Portail Officiel · Écosystème Konkord',
        cta: 'Accéder',
      },
      films: {
        title: 'FILMS & VIDÉO',
        subtitle: 'Lecteur YouTube intégré et accès direct à Netflix.',
        meta: 'YouTube · Netflix · Flux',
        cta: 'Ouvrir Cinéma',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'Lecteur audio, flux MP3, Spotify, YouTube Music et SoundCloud.',
        subtitlePlaying: 'Lecture en cours',
        meta: 'Audio HD · Playlists · Radio',
        cta: 'Ouvrir Lecteur',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Réseau social Second Life pour suivre photos et événements.',
        meta: 'primfeed.com · Communauté SL',
        cta: 'Ouvrir Primfeed',
      },
      internet: {
        title: 'INTERNET & GOOGLE',
        subtitle: 'Navigateur intégré avec recherche Google et barre d’adresse.',
        meta: 'Navigation · Recherche Web',
        cta: 'Naviguer',
      },
      store: {
        title: 'BOUTIQUE VIRTUELLE',
        subtitleUnset: 'Configurez l’adresse de votre boutique Second Life ou catalogue web.',
        subtitleSet: 'Boutique configurée',
        metaSet: 'Adresse Active',
        metaUnset: 'URL Configurable',
        ctaSet: 'Visiter',
        ctaUnset: 'Configurer',
      },
    },
  },
  films: {
    title: 'Centre Films & Vidéo',
    subtitle: 'Lecteur YouTube intégré et accès direct à Netflix',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'Collez un lien ou ID YouTube (ex: youtube.com/watch?v=...)',
    playVideo: 'Lire la vidéo',
    invalidYt: 'Lien ou ID YouTube invalide.',
    expand: 'Agrandir',
    shrink: 'Réduire',
    loadingPlayer: 'Chargement du lecteur YouTube...',
    ytRestrictHint: "Si l'intégration est restreinte par l'auteur, ouvrez en externe.",
    openInYt: 'Ouvrir sur YouTube',
    searchYtTitle: 'Rechercher sur YouTube',
    searchYtPlaceholder: 'Rechercher films, clips, chaînes...',
    recommendedChannels: 'Chaînes Recommandées',
    directEmbed: 'Intégration Directe',
    recentlyPlayed: 'Lus récemment',
    netflixKicker: 'Streaming Externe · Protection DRM',
    netflixDesc:
      'En raison des politiques DRM et X-Frame-Options, Netflix bloque l’intégration dans un cadre externe. Utilisez le bouton ci-dessous pour ouvrir le service.',
    openNetflixExt: 'Ouvrir Netflix en Externe',
    configuredDest: 'Destination configurée',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'Lecteur audio HTML5 réel, flux MP3 et plateformes de streaming',
    playlistTab: 'Playlist & MP3',
    servicesTab: 'Services en ligne',
    studioAudio: 'Konkord Studio Audio',
    directStream: 'Flux / URL Directe',
    queueTitle: "File d'attente",
    nativePlayback: 'Audio HTML5 Natif',
    addAudioTitle: 'Ajouter un lien audio direct (MP3 / Flux)',
    trackNamePlaceholder: 'Titre (optionnel)',
    artistPlaceholder: 'Artiste ou radio (optionnel)',
    urlPlaceholder: 'https://exemple.com/audio.mp3',
    addBtn: 'Ajouter',
    onlineServicesTitle: 'Services de Streaming',
    onlineServicesDesc:
      'Ouvrez le service en externe ou collez un lien Spotify / SoundCloud ci-dessous.',
    openWebApp: 'Ouvrir Web App',
    openWebPlayer: 'Ouvrir Web Player',
    openPlatform: 'Ouvrir Plateforme',
    embedLabel: 'Intégrer un titre ou une playlist (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'Collez le lien ici...',
    loadBtn: 'Charger',
    embedError: 'Collez un lien valide Spotify, SoundCloud ou YouTube Music.',
    audioError: 'Impossible de lire ce lien audio (vérifiez le format MP3/WAV ou CORS).',
    playBlockedError: 'Lecture bloquée par le navigateur. Réessayez.',
  },
  browser: {
    addressPlaceholder: 'Entrez une adresse web (https://...)',
    go: 'Aller',
    googlePlaceholder: 'Rechercher sur Google...',
    externalBrowser: 'Navigateur Externe',
    bookmarks: 'Favoris :',
    blockedTitle: 'Intégration Bloquée par le Site',
    blockedDesc:
      'Ce site utilise X-Frame-Options ou CSP pour empêcher l’affichage intégré. Ouvrez-le dans votre navigateur externe.',
    openExternalBtn: 'OUVRIR DANS LE NAVIGATEUR EXTERNE',
    tryEmbedAnyway: 'Essayer quand même',
    loadingPage: 'Chargement de la page...',
  },
  portal: {
    configureStoreTitle: 'Configurer la Boutique',
    configureStoreSubtitle: 'Entrez l’URL de votre boutique Second Life Marketplace ou web.',
    storeUrlLabel: 'URL de la Boutique',
    storeUrlPlaceholder: 'https://votre-boutique.com',
    saveAndOpen: 'Enregistrer et Ouvrir',
    goToSettings: 'Aller aux Paramètres',
    changeUrl: "Changer l'URL",
    connectingTo: 'Connexion à',
    slFrameNotice: 'Si le site bloque l’affichage dans Second Life, utilisez le bouton ci-contre.',
    openInExternalBrowser: 'dans le navigateur externe',
    storeTitle: 'BOUTIQUE VIRTUELLE',
    storeSubtitle: 'Second Life & Catalogue',
    primfeedSubtitle: 'Communauté Second Life',
    konkordSubtitle: 'Portail Officiel',
  },
  settings: {
    title: 'Paramètres du Système',
    subtitle: 'Personnalisez la langue, le thème, la boutique et les liens des applications',
    restoreDefaults: 'Réinitialiser',
    saveChanges: 'Enregistrer',
    languageSectionTitle: 'Langue du Téléviseur (Global)',
    languageSectionSubtitle: "Changez la langue de l'interface, de l'horloge et de la date.",
    themeSectionTitle: 'Apparence et Thème',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: 'Noir profond avec accents bleu électrique.' },
      violet: { name: 'Violet Cinema', desc: 'Graphite nocturne avec éclairage violet.' },
      graphite: { name: 'Graphite Studio', desc: 'Contraste graphite neutre et cyan doux.' },
      light: { name: 'Daylight Glass', desc: 'Mode clair pour environnements lumineux.' },
    },
    storeUrlLabel: 'URL de la Boutique Virtuelle',
    storeUrlPlaceholder: 'Laissez vide ou entrez https://...',
    storeUrlHint: 'Adresse affichée dans BOUTIQUE.',
    browserHomeLabel: "Page d'accueil du navigateur",
    browserHomeHint: 'URL chargée à l’ouverture de INTERNET.',
    appLinksTitle: 'Liens des Applications',
    systemInfoTitle: 'Informations Système et Affichage',
    currentResolution: 'Résolution Actuelle',
    detectedRatio: 'Format Détecté',
    localStorage: 'Stockage Local',
    storageActive: 'Disponible (Actif)',
    storageRestricted: 'Restreint',
    networkConnection: 'Connexion Réseau',
    connected: 'Connecté',
    disconnected: 'Hors ligne',
  },
};

const deDE: TvTranslations = {
  nav: {
    home: 'START',
    films: 'FILME',
    music: 'MUSIK',
    internet: 'INTERNET',
    stores: 'SHOPS',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'Systemeinstellungen',
    cinemaMode: 'Kinomodus',
    online: 'Online',
    offline: 'Offline',
    languageLabel: 'Sprache',
  },
  common: {
    backHome: 'Zurück zum Start',
    exitCinema: 'Beenden (ESC)',
    cinemaMode: 'Kinomodus',
    copied: 'Kopiert',
    copyLink: 'Link kopieren',
    copyAddress: 'Adresse kopieren',
    openExternally: 'Extern öffnen',
    refresh: 'Aktualisieren',
    cancel: 'Abbrechen',
    save: 'Speichern',
    saved: 'Gespeichert',
    search: 'Suchen',
    loading: 'Wird geladen...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: 'Offizielles Ökosystem',
        title: 'Konkord Experience in Second Life',
        description:
          'Greifen Sie direkt auf Ihrem virtuellen Fernseher auf das offizielle Konkord-Portal zu.',
        cta: 'Konkord öffnen',
      },
      music: {
        kicker: 'Audio-Zentrale',
        title: 'Konkord Music & Direkt-Streams',
        description:
          'Spielen Sie Musik direkt ab, fügen Sie MP3-URLs hinzu oder öffnen Sie Spotify, YouTube Music und SoundCloud.',
        cta: 'Musik hören',
      },
      cinema: {
        kicker: 'Kino & Video',
        title: 'Filme, YouTube & Unterhaltung',
        description:
          'Integrierter YouTube-Player für Videos und Livestreams sowie schneller Zugang zu Netflix.',
        cta: 'Filme entdecken',
      },
    },
    personalizeTv: 'TV anpassen',
    servicesTitle: 'Apps & Dienste',
    servicesSubtitle: 'Wählen Sie eine App per Maus oder navigieren Sie mit den Pfeiltasten',
    settingsBtn: 'Einstellungen',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: 'Offizielles Konkord-Portal direkt integriert.',
        meta: 'Offizielles Portal · Konkord',
        cta: 'Portal öffnen',
      },
      films: {
        title: 'FILME & VIDEO',
        subtitle: 'Integrierter YouTube-Player und direkter Netflix-Zugang.',
        meta: 'YouTube · Netflix · Streams',
        cta: 'Kino öffnen',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'Audioplayer, MP3-Streams, Spotify, YouTube Music & SoundCloud.',
        subtitlePlaying: 'Läuft gerade',
        meta: 'HD Audio · Playlists · Radio',
        cta: 'Player öffnen',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Second Life Netzwerk für Fotos und Events.',
        meta: 'primfeed.com · SL Community',
        cta: 'Primfeed öffnen',
      },
      internet: {
        title: 'INTERNET & GOOGLE',
        subtitle: 'Integrierter Webbrowser mit Google-Suche.',
        meta: 'Browser · Websuche',
        cta: 'Surfen',
      },
      store: {
        title: 'VIRTUELLER SHOP',
        subtitleUnset: 'Konfigurieren Sie Ihre Second Life Shop-URL.',
        subtitleSet: 'Konfigurierter Shop',
        metaSet: 'Aktive URL',
        metaUnset: 'Konfigurierbare URL',
        ctaSet: 'Shop besuchen',
        ctaUnset: 'Shop einrichten',
      },
    },
  },
  films: {
    title: 'Film- & Videozentrale',
    subtitle: 'Integrierter YouTube-Player und Netflix-Zugang',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'YouTube-Link oder Video-ID einfügen...',
    playVideo: 'Abspielen',
    invalidYt: 'Ungültiger YouTube-Link oder ungültige ID.',
    expand: 'Vergrößern',
    shrink: 'Verkleinern',
    loadingPlayer: 'YouTube-Player wird geladen...',
    ytRestrictHint: 'Falls das Einbetten blockiert ist, extern öffnen.',
    openInYt: 'Auf YouTube öffnen',
    searchYtTitle: 'Auf YouTube suchen',
    searchYtPlaceholder: 'Filme, Musik, Kanäle suchen...',
    recommendedChannels: 'Empfohlene Kanäle',
    directEmbed: 'Direkte Einbettung',
    recentlyPlayed: 'Zuletzt abgespielt',
    netflixKicker: 'Externes Streaming · DRM-Schutz',
    netflixDesc:
      'Aufgrund von DRM- und Sicherheitsrichtlinien erlaubt Netflix keine Einbettung in Frames. Öffnen Sie Netflix über die Schaltfläche unten.',
    openNetflixExt: 'Netflix extern öffnen',
    configuredDest: 'Konfiguriertes Ziel',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'Echter HTML5-Audioplayer, MP3-Streams und Online-Musikdienste',
    playlistTab: 'Playlist & MP3',
    servicesTab: 'Online-Dienste',
    studioAudio: 'Konkord Studio Audio',
    directStream: 'Direkt-Stream / URL',
    queueTitle: 'Wiedergabeliste',
    nativePlayback: 'Natives HTML5 Audio',
    addAudioTitle: 'Direkten Audio-Link hinzufügen (MP3 / Stream)',
    trackNamePlaceholder: 'Titel (optional)',
    artistPlaceholder: 'Künstler oder Sender (optional)',
    urlPlaceholder: 'https://beispiel.de/musik.mp3',
    addBtn: 'Hinzufügen',
    onlineServicesTitle: 'Online-Streamingdienste',
    onlineServicesDesc:
      'Öffnen Sie den Dienst extern oder fügen Sie unten einen Spotify- oder SoundCloud-Link ein.',
    openWebApp: 'Web-App öffnen',
    openWebPlayer: 'Web-Player öffnen',
    openPlatform: 'Plattform öffnen',
    embedLabel: 'Titel oder Playlist einbetten (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'Link einfügen...',
    loadBtn: 'Laden',
    embedError: 'Bitte einen gültigen Spotify-, SoundCloud- oder YouTube-Link einfügen.',
    audioError: 'Audio-URL konnte nicht abgespielt werden.',
    playBlockedError: 'Wiedergabe vom Browser blockiert. Erneut auf Play klicken.',
  },
  browser: {
    addressPlaceholder: 'Webadresse eingeben (https://...)',
    go: 'Los',
    googlePlaceholder: 'Bei Google suchen...',
    externalBrowser: 'Externer Browser',
    bookmarks: 'Lesezeichen:',
    blockedTitle: 'Einbettung von Website blockiert',
    blockedDesc:
      'Diese Website verbietet das Laden in Frames (X-Frame-Options / CSP). Öffnen Sie sie im externen Browser.',
    openExternalBtn: 'IM EXTERNEN BROWSER ÖFFNEN',
    tryEmbedAnyway: 'Trotzdem versuchen',
    loadingPage: 'Seite wird geladen...',
  },
  portal: {
    configureStoreTitle: 'Shop-Adresse einrichten',
    configureStoreSubtitle: 'Geben Sie die URL Ihres Second Life Shops ein.',
    storeUrlLabel: 'Shop-URL',
    storeUrlPlaceholder: 'https://ihr-shop.com',
    saveAndOpen: 'Speichern & Öffnen',
    goToSettings: 'Zu den Einstellungen',
    changeUrl: 'URL ändern',
    connectingTo: 'Verbindung zu',
    slFrameNotice: 'Falls die Seite im Viewer blockiert wird, nutzen Sie den Button rechts.',
    openInExternalBrowser: 'im externen Browser',
    storeTitle: 'VIRTUELLER SHOP',
    storeSubtitle: 'Second Life & Katalog',
    primfeedSubtitle: 'Second Life Community',
    konkordSubtitle: 'Offizielles Portal',
  },
  settings: {
    title: 'Systemeinstellungen',
    subtitle: 'Sprache, Design, Shop-URL, Startseite und App-Links anpassen',
    restoreDefaults: 'Zurücksetzen',
    saveChanges: 'Änderungen speichern',
    languageSectionTitle: 'TV-Sprache (Global)',
    languageSectionSubtitle: 'Sprache der Oberfläche sowie Uhr- und Datumsformat ändern.',
    themeSectionTitle: 'Design & Erscheinungsbild',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: 'Tiefschwarz mit elektrischen blauen Akzenten.' },
      violet: { name: 'Violet Cinema', desc: 'Nachtgraphit mit violetter Beleuchtung.' },
      graphite: { name: 'Graphite Studio', desc: 'Neutrales Graphit mit sanftem Cyan.' },
      light: { name: 'Daylight Glass', desc: 'Heller Modus für helle virtuelle Räume.' },
    },
    storeUrlLabel: 'Shop-URL (Shops)',
    storeUrlPlaceholder: 'Leer lassen oder https://... eingeben',
    storeUrlHint: 'Wird im Bereich SHOPS angezeigt.',
    browserHomeLabel: 'Browser-Startseite',
    browserHomeHint: 'Standard-URL beim Öffnen von INTERNET.',
    appLinksTitle: 'App- & Dienst-Links',
    systemInfoTitle: 'TV- & Anzeigeinformationen',
    currentResolution: 'Aktuelle Auflösung',
    detectedRatio: 'Erkanntes Format',
    localStorage: 'Lokaler Speicher',
    storageActive: 'Verfügbar (Aktiv)',
    storageRestricted: 'Eingeschränkt',
    networkConnection: 'Netzwerkverbindung',
    connected: 'Verbunden',
    disconnected: 'Offline',
  },
};

const jaJP: TvTranslations = {
  nav: {
    home: 'ホーム',
    films: '映画',
    music: '音楽',
    internet: 'ネット',
    stores: 'ストア',
    primfeed: 'PRIMFEED',
    konkord: 'KONKORD',
    settings: 'システム設定',
    cinemaMode: 'シネマモード',
    online: 'オンライン',
    offline: 'オフライン',
    languageLabel: '言語',
  },
  common: {
    backHome: 'ホームに戻る',
    exitCinema: '終了 (ESC)',
    cinemaMode: 'シネマモード',
    copied: 'コピー済み',
    copyLink: 'リンクをコピー',
    copyAddress: 'URLをコピー',
    openExternally: '外部で開く',
    refresh: '更新',
    cancel: 'キャンセル',
    save: '保存',
    saved: '保存完了',
    search: '検索',
    loading: '読み込み中...',
  },
  home: {
    heroSlides: {
      konkord: {
        kicker: '公式エコシステム',
        title: 'Second Life で楽しむ Konkord',
        description:
          '仮想テレビ画面から Konkord 公式ポータルへ直接アクセス。洗練されたインターフェースで快適な操作を実現。',
        cta: 'Konkord を開く',
      },
      music: {
        kicker: 'オーディオハブ',
        title: 'Konkord Music & ダイレクト配信',
        description:
          '高音質オーディオ再生、MP3 URL の追加、Spotify・YouTube Music・SoundCloud へのアクセスに対応。',
        cta: '音楽を聴く',
      },
      cinema: {
        kicker: 'シネマ & ビデオ',
        title: '映画・YouTube・エンターテインメント',
        description:
          'YouTube 埋め込みプレーヤーと Netflix へのクイックアクセスを搭載。',
        cta: '映画を見る',
      },
    },
    personalizeTv: 'TVをカスタマイズ',
    servicesTitle: 'アプリ・サービス',
    servicesSubtitle: 'マウスまたはキーボードの矢印キーで操作できます',
    settingsBtn: '設定',
    cards: {
      konkord: {
        title: 'KONKORD',
        subtitle: '公式ポータルと Konkord プロジェクトをテレビに統合。',
        meta: '公式ポータル · Konkord',
        cta: '開く',
      },
      films: {
        title: '映画・ビデオ',
        subtitle: 'YouTube プレーヤーと Netflix へのダイレクトアクセス。',
        meta: 'YouTube · Netflix · ストリーム',
        cta: 'シネマを開く',
      },
      music: {
        title: 'KONKORD MUSIC',
        subtitle: 'オーディオ再生、MP3配信、Spotify、YouTube Music、SoundCloud。',
        subtitlePlaying: '再生中',
        meta: 'HD オーディオ · プレイリスト',
        cta: 'プレーヤーを開く',
      },
      primfeed: {
        title: 'PRIMFEED',
        subtitle: 'Second Life の写真やイベントをチェックできるSNS。',
        meta: 'primfeed.com · SLコミュニティ',
        cta: 'Primfeed を開く',
      },
      internet: {
        title: 'インターネット & Google',
        subtitle: 'Google 検索とアドレスバーを備えた内蔵ブラウザ。',
        meta: 'ブラウジング · 検索',
        cta: '開く',
      },
      store: {
        title: 'バーチャルストア',
        subtitleUnset: 'Second Life ストアやカタログの URL を設定します。',
        subtitleSet: '設定済みストア',
        metaSet: '有効な URL',
        metaUnset: '設定可能な URL',
        ctaSet: 'ストアへ',
        ctaUnset: 'ストアを設定',
      },
    },
  },
  films: {
    title: '映画・ビデオセンター',
    subtitle: 'YouTube 埋め込み再生と Netflix へのクイックアクセス',
    youtubeTab: 'YouTube TV',
    netflixTab: 'Netflix',
    ytPlaceholder: 'YouTube の URL または動画 ID を貼り付け...',
    playVideo: '再生',
    invalidYt: '無効な YouTube リンクまたは動画 ID です。',
    expand: '拡大',
    shrink: '縮小',
    loadingPlayer: 'YouTube プレーヤーを読み込み中...',
    ytRestrictHint: '埋め込みが制限されている動画は外部ブラウザで開いてください。',
    openInYt: 'YouTube で開く',
    searchYtTitle: 'YouTube を検索',
    searchYtPlaceholder: '映画、音楽、チャンネルを検索...',
    recommendedChannels: 'おすすめチャンネル',
    directEmbed: '直接再生',
    recentlyPlayed: '最近の再生',
    netflixKicker: '外部ストリーミング · DRM保護',
    netflixDesc:
      'DRMおよびセキュリティ制限（X-Frame-Options）により、Netflix は埋め込み再生に対応していません。下のボタンから外部ブラウザで開いてください。',
    openNetflixExt: '外部で Netflix を開く',
    configuredDest: '設定されたリンク',
  },
  music: {
    title: 'KONKORD MUSIC',
    subtitle: 'HTML5 オーディオ再生、MP3 ストリーム、オンライン音楽連携',
    playlistTab: 'プレイリスト & MP3',
    servicesTab: 'オンラインサービス',
    studioAudio: 'Konkord Studio Audio',
    directStream: '直接ストリーム / URL',
    queueTitle: '再生キュー',
    nativePlayback: 'HTML5 ネイティブ再生',
    addAudioTitle: 'オーディオ URL を追加 (MP3 / ストリーム)',
    trackNamePlaceholder: '曲名（任意）',
    artistPlaceholder: 'アーティスト（任意）',
    urlPlaceholder: 'https://example.com/music.mp3',
    addBtn: '追加',
    onlineServicesTitle: 'オンライン音楽サービス',
    onlineServicesDesc:
      '外部ブラウザで開くか、Spotify / SoundCloud の曲・プレイリスト URL を下に貼り付けてください。',
    openWebApp: 'Web アプリを開く',
    openWebPlayer: 'Web プレーヤーを開く',
    openPlatform: '開く',
    embedLabel: '曲またはプレイリストを埋め込む (Spotify / SoundCloud / YouTube)',
    embedPlaceholder: 'リンクを貼り付け...',
    loadBtn: '読み込む',
    embedError: 'Spotify、SoundCloud、または YouTube Music の有効なリンクを入力してください。',
    audioError: '音声を再生できませんでした。MP3/WAV URL または CORS 対応を確認してください。',
    playBlockedError: 'ブラウザにより再生がブロックされました。もう一度再生を押してください。',
  },
  browser: {
    addressPlaceholder: 'URL を入力 (https://...)',
    go: '移動',
    googlePlaceholder: 'Google で検索...',
    externalBrowser: '外部ブラウザ',
    bookmarks: 'ブックマーク:',
    blockedTitle: 'サイト側で埋め込みがブロックされています',
    blockedDesc:
      'このサイトはセキュリティポリシー（X-Frame-Options / CSP）によりフレーム内表示を許可していません。外部ブラウザで開いてください。',
    openExternalBtn: '外部ブラウザで開く',
    tryEmbedAnyway: 'そのまま試行する',
    loadingPage: 'ページを読み込み中...',
  },
  portal: {
    configureStoreTitle: 'ストア URL の設定',
    configureStoreSubtitle: 'Second Life マーケットプレイスやストアの URL を入力してください。',
    storeUrlLabel: 'ストア URL',
    storeUrlPlaceholder: 'https://your-store.com',
    saveAndOpen: '保存して開く',
    goToSettings: '設定へ移動',
    changeUrl: 'URL を変更',
    connectingTo: '接続中:',
    slFrameNotice: 'Second Life ビューアで表示できない場合は右側のボタンをご利用ください。',
    openInExternalBrowser: '外部ブラウザで開く',
    storeTitle: 'バーチャルストア',
    storeSubtitle: 'Second Life & カタログ',
    primfeedSubtitle: 'Second Life コミュニティ',
    konkordSubtitle: '公式ポータル',
  },
  settings: {
    title: 'システム設定',
    subtitle: '言語、テーマ、ストアURL、ブラウザのホームページ、アプリリンクを設定',
    restoreDefaults: '初期設定に戻す',
    saveChanges: '変更を保存',
    languageSectionTitle: 'テレビの言語設定（グローバル）',
    languageSectionSubtitle: '表示言語、時計・日付フォーマットを切り替えます。',
    themeSectionTitle: 'テーマと外観',
    themes: {
      obsidian: { name: 'Obsidian Blue', desc: '深みのある黒とエレクトリックブルー。' },
      violet: { name: 'Violet Cinema', desc: 'ナイトグラファイトとバイオレットの光。' },
      graphite: { name: 'Graphite Studio', desc: '落ち着いたグラファイトとシアン。' },
      light: { name: 'Daylight Glass', desc: '明るい空間向けのライトモード。' },
    },
    storeUrlLabel: 'ストア URL（ストアタブ）',
    storeUrlPlaceholder: '空欄または https://... を入力',
    storeUrlHint: 'ストア画面で表示される URL です。',
    browserHomeLabel: 'ブラウザのホームページ',
    browserHomeHint: 'インターネットタブを開いたときの初期 URL です。',
    appLinksTitle: 'アプリ・サービスリンク',
    systemInfoTitle: 'テレビ・画面情報',
    currentResolution: '現在の解像度',
    detectedRatio: 'アスペクト比',
    localStorage: 'ローカル保存',
    storageActive: '有効',
    storageRestricted: '制限あり',
    networkConnection: 'ネットワーク接続',
    connected: '接続済み',
    disconnected: 'オフライン',
  },
};

const TRANSLATIONS: Record<LanguageId, TvTranslations> = {
  'pt-BR': ptBR,
  'en-US': enUS,
  'es-ES': esES,
  'fr-FR': frFR,
  'de-DE': deDE,
  'ja-JP': jaJP,
};

export function getTranslations(lang: LanguageId): TvTranslations {
  return TRANSLATIONS[lang] ?? ptBR;
}
