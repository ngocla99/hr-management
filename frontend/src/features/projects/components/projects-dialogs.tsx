import { useProjects } from '../context/projects-context'
import { ProjectsDeleteDialog } from './projects-delete-dialog'
import { ProjectsMutateDialog } from './projects-mutate-dialog'

export function ProjectsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProjects()

  return (
    <>
      {/* Create/Edit Form Dialog */}
      <ProjectsMutateDialog
        key={
          currentRow ? `project-form-${currentRow.id}` : 'project-form-create'
        }
        open={open === 'create' || open === 'edit'}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpen(null)
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }
        }}
        currentRow={open === 'edit' && currentRow ? currentRow : undefined}
      />

      {/* Delete Dialog */}
      {currentRow && (
        <ProjectsDeleteDialog
          key={`project-delete-${currentRow.id}`}
          open={open === 'delete'}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }
          }}
          currentRow={currentRow}
        />
      )}
    </>
  )
}
