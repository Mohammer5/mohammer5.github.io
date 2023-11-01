import classes from './markdown.module.css'

export function MarkdownContainer({ content: Content }) {
  return (
    <div className={classes.markdown}>
      <Content />
    </div>
  )
}
