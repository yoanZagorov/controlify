import { SvgIcon } from "@/components/SvgIcon";
import cn from "classnames"

export default function Section({ title, subtitle = "", className, contentClassName, children }) {
  // const hasInteraction = Object.keys(interaction).length > 0;

  const classes = {
    section: cn(className),
    content: cn(
      "mt-4",
      contentClassName
    )
  }
  // <div className="flex justify-between items-center">
  //   <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">{title}</h2>
  //   <interaction.fetcher.Form method="post" action={interaction.action}>
  //     <button className="size-5" name="intent" value={interaction.btnValue}>
  //       <SvgIcon iconName={interaction.icon.name} className={`size-full ${interaction.icon.fill}`} />
  //     </button>
  //   </interaction.fetcher.Form>
  // </div>

  return (
    <section className={classes.section}>
      <h2 className="text-3xl text-navy-dark font-semibold tracking-wide">{title}</h2>
      {subtitle && <h3 className="text-navy-dark opacity-50 font-semibold">{subtitle}</h3>}

      <div className={classes.content}>
        {children}
      </div>
    </section >
  )
}
