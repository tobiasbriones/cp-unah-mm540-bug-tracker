/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Top.css';
import Category from './Category';
import Add from './Add';

function Top(props) {
  return (
    <div className="Top">
      <Category
        list={props.list}
        onUpdateCategory={props.onUpdateCategory}
      ></Category>
      <Add categories={props.list} onCreateNote={props.onCreateNote}></Add>
    </div>
  );
}

export default Top;
