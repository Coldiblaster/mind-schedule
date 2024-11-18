'use client';
import { CompanyLogo } from '@/components/company-logo';
import { Caption } from '@/components/typography';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function UseTerms() {
  return (
    <ScrollArea className="fixed h-svh w-full bg-white px-4 dark:bg-black md:relative md:px-8">
      <div className="mt-4 flex flex-col items-center gap-3 text-lg">
        <CompanyLogo width={140} height={140} />
        <Caption as="100" className="mt-5 text-center">
          Mind Schedule
        </Caption>
      </div>

      <h1>Termos de Uso - Mind Schedule</h1>
      <p>
        Estes Termos de Uso (&quot;Termos&quot;) regem o acesso e uso do sistema
        de agendamento online, disponibilizado pela empresa Vinicius Bastazin
        Araujo Desenvolvimento de Software LTDA, inscrita no CNPJ/MF sob o nº
        51492413000171 (&quot;Mind Schedule&quot;, &quot;nós&quot;,
        &quot;nosso&quot;, &quot;nos&quot;). Ao acessar e utilizar o sistema,
        você concorda com os presentes Termos e as Políticas de Privacidade
        associadas. Caso não concorde com algum dos termos, recomendamos que não
        utilize o sistema.
      </p>

      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar e utilizar o Mind Schedule, você concorda com os Termos de
        Uso aqui descritos, bem como com a nossa Política de Privacidade. Estes
        Termos podem ser alterados a qualquer momento, sem aviso prévio. O uso
        continuado do sistema após qualquer modificação constitui aceitação dos
        novos termos.
      </p>

      <h2>2. Definições</h2>
      <p>Para os fins deste Termo de Uso, as definições são as seguintes:</p>
      <ul>
        <li>
          <strong>Usuário:</strong> qualquer pessoa que acessa ou utiliza o
          sistema de agendamento.
        </li>
        <li>
          <strong>Prestador de Serviço:</strong> profissionais ou empresas que
          utilizam o sistema para gerenciar agendamentos de serviços.
        </li>
        <li>
          <strong>Dados Pessoais:</strong> informações que permitem a
          identificação de uma pessoa, como nome, e-mail, CPF, entre outras.
        </li>
      </ul>

      <h2>3. Objetivo do Sistema</h2>
      <p>
        O Mind Schedule é uma plataforma de agendamento online que permite que
        usuários agendem serviços de prestadores de diferentes segmentos, como
        salões de beleza, clínicas de estética, mecânicos, entre outros. O
        sistema facilita a marcação de compromissos, organização de agendas e a
        comunicação entre clientes e prestadores de serviço.
      </p>

      <h2>4. Obrigações dos Usuários</h2>
      <p>Os usuários do sistema concordam em:</p>
      <ul>
        <li>
          Fornecer informações corretas, precisas e completas ao realizar o
          cadastro e agendamentos.
        </li>
        <li>
          Manter seus dados de login e senha em segurança e não compartilhar com
          terceiros.
        </li>
        <li>Não utilizar o sistema para fins ilegais ou não autorizados.</li>
        <li>
          Informar qualquer alteração nos dados cadastrais de forma imediata.
        </li>
      </ul>

      <h2>5. Obrigações dos Prestadores de Serviço</h2>
      <p>Os prestadores de serviço concordam em:</p>
      <ul>
        <li>
          Manter a veracidade e a atualidade das informações sobre os serviços
          prestados e seus horários de funcionamento.
        </li>
        <li>
          Garantir que os serviços sejam prestados conforme agendado e com a
          qualidade prometida.
        </li>
        <li>
          Responder prontamente às solicitações de agendamento e garantir a
          disponibilidade conforme suas agendas.
        </li>
      </ul>

      <h2>6. Coleta de Dados Pessoais</h2>
      <p>Ao utilizar o sistema, coletamos os seguintes dados pessoais:</p>
      <ul>
        <li>
          <strong>Dados do Cliente:</strong> Nome, e-mail, telefone, CPF.
        </li>
        <li>
          <strong>Dados do Prestador de Serviço:</strong> Nome, e-mail,
          telefone, CPF ou CNPJ, endereço comercial, serviços oferecidos e
          horários de atendimento.
        </li>
        <li>
          <strong>Dados de Navegação:</strong> Informações sobre a sua interação
          com o sistema, como tipo de navegador, páginas acessadas, endereço IP,
          entre outros.
        </li>
        <li>
          <strong>Dados Sensíveis:</strong> O sistema pode armazenar dados
          sensíveis, como históricos de serviços e laudos, conforme o segmento
          de atuação.
        </li>
      </ul>
      <p>
        Os dados coletados são utilizados para viabilizar o agendamento de
        serviços, melhorar a experiência do usuário e realizar ações de
        marketing e publicidade. Para mais detalhes sobre o tratamento de seus
        dados, consulte nossa{' '}
        <a href="politica-privacidade.html">Política de Privacidade</a>.
      </p>

      <h2>7. Propriedade Intelectual</h2>
      <p>
        Todo o conteúdo e funcionalidades do Mind Schedule, incluindo, mas não
        se limitando a, software, design, texto, gráficos e logotipos, são de
        propriedade da Vinicius Bastazin Araujo Desenvolvimento de Software LTDA
        ou licenciados por ela, estando protegidos pelas leis de propriedade
        intelectual aplicáveis. O uso não autorizado de qualquer material do
        sistema pode violar direitos autorais, marcas registradas e outras leis.
      </p>

      <h2>8. Limitação de Responsabilidade</h2>
      <p>O Mind Schedule não se responsabiliza por:</p>
      <ul>
        <li>
          Falhas ou erros na prestação de serviços dos prestadores de serviço.
        </li>
        <li>
          Problemas técnicos que possam afetar o acesso ao sistema, como
          instabilidade na internet ou falhas no servidor.
        </li>
        <li>
          Quaisquer danos indiretos, lucros cessantes, danos especiais ou
          incidentais decorrentes do uso do sistema.
        </li>
      </ul>

      <h2>9. Suspensão e Cancelamento de Conta</h2>
      <p>
        Podemos suspender ou cancelar a conta de qualquer usuário ou prestador
        de serviço que viole estes Termos de Uso, sem aviso prévio. Caso haja a
        necessidade de revogação de acesso, o usuário será notificado, e todas
        as informações associadas à conta serão apagadas, conforme estipulado
        pela nossa Política de Privacidade.
      </p>

      <h2>10. Alterações nos Termos de Uso</h2>
      <p>
        Nos reservamos o direito de alterar estes Termos de Uso a qualquer
        momento, sendo que as alterações serão publicadas neste site, com a data
        de revisão atualizada. O uso contínuo do sistema após tais alterações
        constitui aceitação dos novos termos.
      </p>

      <h2>11. Legislação Aplicável</h2>
      <p>
        Este Termo de Uso será regido e interpretado de acordo com as leis da
        República Federativa do Brasil, e qualquer disputa relacionada a ele
        será submetida ao foro da comarca de São Paulo, Estado de São Paulo.
      </p>

      <h2>12. Contato</h2>
      <p>
        Se você tiver dúvidas ou preocupações sobre estes Termos de Uso ou sobre
        como tratamos seus dados pessoais, entre em contato conosco pelo e-mail{' '}
        <a href="mailto:jorgebrunetto@hotmail.com">jorgebrunetto@hotmail.com</a>
        .
      </p>
    </ScrollArea>
  );
}
