'use client';

import { useState } from 'react';

import { CardProfessional } from '@/components/card-professional';
import { FilterOptions } from '@/components/filter-options';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { professionalData, ProfessionalProps } from '@/data/mock/professional';
import { useMultiStepForm } from '@/hooks/use-multistep-form';

export function Step01() {
  const { updatePropertyForm } = useMultiStepForm();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 5;

  const normalizeString = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const doesNameMatch = (name: string, search: string) => {
    const normalizedName = normalizeString(name);
    const normalizedSearch = normalizeString(search);
    return normalizedName.includes(normalizedSearch);
  };

  const filteredProfessionals = professionalData.filter(professional =>
    doesNameMatch(professional.name, searchTerm),
  );

  const totalPages = Math.ceil(
    (filteredProfessionals?.length || 0) / itemsPerPage,
  );

  const maxPageLinks = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfessional = filteredProfessionals.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const generatePagination = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - Math.floor(maxPageLinks / 2), 1);
    const endPage = Math.min(startPage + maxPageLinks - 1, totalPages);

    pageNumbers.push(
      <PaginationItem key="previous">
        <PaginationPrevious
          className={`${currentPage === 1 && 'cursor-not-allowed hover:bg-transparent'}`}
          href="#start"
          onClick={() => {
            currentPage > 1 && setCurrentPage(prev => Math.max(prev - 1, 1));
          }}
        />
      </PaginationItem>,
    );

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key="startEllipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#start"
            isActive={i === currentPage}
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <PaginationItem key="endEllipsis">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    pageNumbers.push(
      <PaginationItem key="next">
        <PaginationNext
          className={`${currentPage === totalPages && 'cursor-not-allowed hover:bg-transparent'}`}
          href="#start"
          onClick={() => {
            currentPage < totalPages &&
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
          }}
        />
      </PaginationItem>,
    );

    return pageNumbers;
  };

  const handleSelectProfessional = (value: ProfessionalProps) => {
    updatePropertyForm({
      stepNumber: 2,
      professional: value,
    });
  };

  return (
    <>
      <CardHeader className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-lg font-bold md:text-2xl">
              Escolha seu profissional
            </h1>

            <FilterOptions />
          </div>
          <span className="text-xs text-muted-foreground md:text-sm">
            Selecione o profissional ideal para o seu atendimento
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <Input
            id="name"
            type="text"
            placeholder="Pesquise por um profissional"
            autoComplete="off"
            icon="LuSearch"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex h-full w-full animate-fade flex-col overflow-auto">
          {paginatedProfessional.length > 0 ? (
            <>
              {paginatedProfessional.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectProfessional(item)}
                >
                  <CardProfessional
                    name={item.name}
                    avatar={item.avatar}
                    specialty={item.specialty}
                    advice={item.advice}
                    className="hover:bg-background"
                  />
                </button>
              ))}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h2 className="text-lg font-semibold text-muted-foreground">
                Nenhum profissional corresponde à sua busca.
              </h2>
              <p className="text-sm text-muted-foreground">
                Tente usar um nome diferente ou ajustar os critérios de
                pesquisa.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {paginatedProfessional.length > 0 && (
          <Pagination>
            <PaginationContent>{generatePagination()}</PaginationContent>
          </Pagination>
        )}
      </CardFooter>
    </>
  );
}
