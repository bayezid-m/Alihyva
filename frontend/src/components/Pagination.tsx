import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
  setPostsPerPage: (postsPerPage: number) => void;
}

export default function PaginationDo({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
  setPostsPerPage,
}: PaginationProps) {
  let pages: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const decrement = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const increment = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: '50%'}}>
        <Button onClick={decrement}>
          <ArrowBackIosIcon/>
        </Button>
        <div className="cpage">
          <p className="dpage">{currentPage}</p>
          -
          <p className="dpage">{Math.ceil(totalPosts / postsPerPage)}</p>
        </div>
        <Button onClick={increment}>
         <ArrowForwardIosIcon/>
        </Button>
      </div>
    </div>
  );
}
