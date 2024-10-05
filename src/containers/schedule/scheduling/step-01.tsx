'use client';

import { useState } from 'react';

import { CardProfessional } from '@/components/card-professional';
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
import { useMultiStepForm } from '@/hooks/multistep-form';

export function Step01() {
  const { updatePropertyForm } = useMultiStepForm();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil((professionalData?.length || 0) / itemsPerPage);

  const maxPageLinks = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfessional = professionalData?.slice(
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
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-bold md:text-2xl">
          Escolha seu profissional
        </h1>
        <span className="text-xs text-muted-foreground md:text-sm">
          Selecione o profissional ideal para o seu atendimento
        </span>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Input
          id="picture"
          type="text"
          placeholder="Pesquise por um profissional"
          autoComplete="off"
        />
      </div>

      <div className="flex h-full w-full animate-fade flex-col overflow-auto">
        {paginatedProfessional.map((item, index) => {
          const { name, avatar, specialty, advice } = item;

          return (
            <button key={index} onClick={() => handleSelectProfessional(item)}>
              <CardProfessional
                name={name}
                avatar={avatar}
                specialty={specialty}
                advice={advice}
                className="hover:bg-background"
              />
            </button>
          );
        })}
      </div>

      <Pagination>
        <PaginationContent>{generatePagination()}</PaginationContent>
      </Pagination>
    </>
  );
}
