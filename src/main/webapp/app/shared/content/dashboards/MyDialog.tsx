import React, { Suspense } from 'react';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SuspenseLoader from '../../../shared/components/SuspenseLoader';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { Button } from 'reactstrap';
const styles = {
  root: {
    height: '100%',
  },
  project: {
    backgroundColor: 'lightblue',
    height: '100%',
  },
  right: {
    height: '100%',
  },
  media: {
    backgroundColor: 'lightgreen',
    height: '100%',
  },
};

const Loader = Component => props =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
const Crypto = Loader(React.lazy(() => import('../../../shared/content/dashboards/Crypto')));
const loanlimits = [
  { id: 1, amount: 150000 },
  { id: 1, amount: 150000 },
  { id: 1, amount: 100000 },
  { id: 1, amount: 80000 },
];
const MyDialog = props => {
  // const loanlimits = useAppSelector(state => state.finances.loanlimits.entities);

  console.log('LoanLimits' + loanlimits);
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button color="inherit" onClick={props.handleClose} aria-label="Close">
              <CloseIcon />
            </Button>
            Loans
          </Grid>
          <Grid item xs={6}>
            Loan Limits
            {loanlimits.map(loanlimit => {
              JSON.stringify(loanlimit);
              <div></div>;
            })}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
export default MyDialog;
