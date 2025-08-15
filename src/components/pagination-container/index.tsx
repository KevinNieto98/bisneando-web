'use client';
import React from 'react';
import { Pagination } from '../ui/pagination';



export const PaginationContainer = () => {
    return (
        <div className='flex justify-center items-center'>
        <Pagination totalPages={10} currentPage={1} onPageChange={(p) => console.log(p)} />
        </div>
    );
};