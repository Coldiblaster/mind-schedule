'use client';
import { CompanyLogo } from '@/components/company-logo';
import { Caption } from '@/components/typography';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function PrivacyPolicy() {
  return (
    <ScrollArea className="fixed h-svh w-full bg-white px-4 dark:bg-black md:relative md:px-8">
      <div className="mt-4 flex flex-col items-center gap-3 text-lg">
        <CompanyLogo width={140} height={140} />
        <Caption as="100" className="mt-5 text-center">
          Mind Schedule
        </Caption>
      </div>

      <h1 className="mt-6 text-3xl font-bold text-foreground">
        Política de Privacidade da Mind Schedule
      </h1>
      <p className="text-sm text-muted-foreground">
        Última atualização: Novembro de 2024
      </p>
      <div className="mt-10 grid gap-10">
        <section>
          <h2 className="text-2xl font-semibold text-blue-600">1. Sobre Nós</h2>
          <p className="mt-4">
            A{' '}
            <strong>
              VINICIUS BASTAZIN ARAUJO DESENVOLVIMENTO DE SOFTWARE LTDA
            </strong>
            , pessoa jurídica de direito privado, com sede na Avenida Paulista,
            1636 - Bela Vista, Sao Paulo, inscrita no CNPJ/MF sob o nº
            51492413000171, opera a plataforma de agendamento online{' '}
            <strong>Mind Schedule</strong> para diversos segmentos como Salões
            de Beleza, Clínicas de Estética, e outros.
          </p>
          <p className="mt-2">
            Prezamos pela privacidade e segurança de nossos usuários, clientes,
            prestadores de serviços e parceiros. Esta Política de Privacidade
            detalha como coletamos, usamos e protegemos seus dados pessoais.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            2. Coleta de Dados Pessoais
          </h2>
          <p className="mt-4">
            Coletamos os seguintes dados, conforme sua interação conosco:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-2">
            <li>
              <strong>Cliente:</strong> Nome, e-mail, telefone, CPF.
            </li>
            <li>
              <strong>Prestador de Serviço:</strong> Nome, e-mail, telefone, CPF
              ou CNPJ, endereço comercial, serviços oferecidos e horários de
              atendimento.
            </li>
            <li>
              <strong>Dados Sensíveis:</strong> Históricos de visita, relatórios
              técnicos e fichas descritivas, quando aplicáveis ao serviço
              prestado.
            </li>
            <li>
              <strong>Dados de Navegação:</strong> Informações coletadas
              automaticamente, como cookies, endereço IP, e preferências do
              navegador.
            </li>
            <li>
              <strong>Pagamentos:</strong> Informações relacionadas a transações
              via QR Code Pix e gateways como MercadoPago e PagSeguro.
            </li>
          </ul>
          <p className="mt-4">
            Os dados coletados podem variar dependendo do segmento ou da
            finalidade do serviço.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            3. Uso dos Dados Pessoais
          </h2>
          <p className="mt-4">Os dados coletados são utilizados para:</p>
          <ul className="mt-2 list-inside list-disc space-y-2">
            <li>Viabilizar agendamentos e gestão de serviços contratados.</li>
            <li>Fornecer suporte técnico ou operacional.</li>
            <li>Personalizar sua experiência em nossa plataforma.</li>
            <li>
              Enviar informações relevantes sobre nossos serviços ou promoções.
            </li>
            <li>Cumprir exigências legais e regulatórias.</li>
          </ul>
          <p className="mt-4">
            O uso de dados sensíveis está restrito às finalidades específicas e
            requer consentimento explícito.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            4. Compartilhamento de Dados
          </h2>
          <p className="mt-4">Podemos compartilhar seus dados pessoais com:</p>
          <ul className="mt-2 list-inside list-disc space-y-2">
            <li>
              Parceiros comerciais para a execução dos serviços contratados.
            </li>
            <li>
              Prestadores de serviços técnicos, como hospedagem e processamento
              de pagamentos.
            </li>
            <li>Autoridades legais, conforme exigido por lei.</li>
          </ul>
          <p className="mt-4">
            Garantimos que todos os terceiros envolvidos no tratamento de seus
            dados adotam medidas adequadas de segurança.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            5. Direitos do Usuário
          </h2>
          <p className="mt-4">Você tem direito a:</p>
          <ul className="mt-2 list-inside list-disc space-y-2">
            <li>Acessar e corrigir seus dados pessoais.</li>
            <li>
              Solicitar anonimização, bloqueio ou exclusão de dados excessivos
              ou desnecessários.
            </li>
            <li>Portabilidade de dados a outro prestador de serviços.</li>
            <li>Revogar consentimento para o tratamento de dados.</li>
          </ul>
          <p className="mt-4">
            Para exercer seus direitos, entre em contato pelo e-mail{' '}
            <strong>contato@mind-schedule.com.br</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            6. Segurança dos Dados
          </h2>
          <p className="mt-4">
            Adotamos medidas técnicas e organizacionais para proteger seus dados
            contra acessos não autorizados, perdas ou alterações. No entanto,
            nenhum sistema é completamente seguro, e recomendamos que você nos
            informe caso identifique qualquer vulnerabilidade.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600">
            7. Alterações na Política
          </h2>
          <p className="mt-4">
            Reservamo-nos o direito de atualizar esta Política de Privacidade.
            Recomendamos que você a consulte regularmente para estar ciente de
            quaisquer mudanças.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-2xl font-semibold text-blue-600">8. Contato</h2>
          <p className="mt-4">
            Para dúvidas ou solicitações relacionadas à privacidade, entre em
            contato:
          </p>
          <p className="mt-2">
            <strong>E-mail:</strong> contato@mind-schedule.com.br
          </p>
        </section>
      </div>
    </ScrollArea>
  );
}
