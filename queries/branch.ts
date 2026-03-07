import { API } from '@/constants/api';
import { BranchResponse } from '@/types/branch';

export async function fetchBranches(): Promise<BranchResponse> {
  const res = await fetch(API.BRANCHES);
  if (!res.ok) throw new Error('...');
  return res.json();
}
