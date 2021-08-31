/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

export function getTable({ ctx, title, cols, getRow }) {
  return (
    <div>
      <p className="text-center font-weight-bold">
        <strong>{ title }</strong>
      </p>

      <button
        className="btn btn-primary"
        type="button"
        onClick={ ctx.onAddButtonClick.bind(ctx) }>
        Nuevo
      </button>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            { cols.map(col => (
              <th scope="col">{ col }</th>
            )) }
          </tr>
        </thead>

        <tbody>
          { ctx.state.values.map(getRow) }
        </tbody>
      </table>
    </div>
  );
}

export function getCreateForm({ ctx, title, groups }) {
  const state = ctx.state;
  const onSubmit = ctx.onCreateFormSubmit;
  return (
    <div className={ `mt-5 ${ state.createFormDisplayClass }` }>
      <p className="text-center font-weight-bold">
        <strong>{ title }</strong>
      </p>

      <form className="p-0 mx-5" onSubmit={ onSubmit.bind(ctx) }>

        { groups }

        <button className="btn btn-primary w-100" type="submit">Registrar</button>

        <div className="text-danger my-4">{ state.createError }</div>
      </form>
    </div>
  );
}

export function getUpdateForm({ ctx, title, groups }) {
  const state = ctx.state;
  const onSubmit = ctx.onUpdateFormSubmit;
  return (
    <div className={ `mt-5 ${ state.updateFormDisplayClass }` }>
      <p className="text-center font-weight-bold">
        <strong>{ title }</strong>
      </p>

      <form className="p-0 mx-5" onSubmit={ onSubmit.bind(ctx) }>

        { groups }

        <div className="d-flex">
          <button className="btn btn-primary me-2" type="submit">Actualizar</button>
          <button className="btn btn-danger ms-2"
                  onClick={ ctx.onDelete.bind(ctx) }>
            Eliminar
          </button>
        </div>

        <div className="text-danger my-4">
          { state.updateError }
        </div>
      </form>
    </div>
  );
}